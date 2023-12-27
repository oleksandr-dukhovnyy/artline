import defaultDB from '@/api/offline-fake-api/DB.js';
import { config } from '@/api/offline-fake-api/config.fakeapi.js';
import initDBTools from '@/api/offline-fake-api/DBTools.js';

let DataBase;
let tokeList = [];

function generateToken(n = config.tokenLength) {
  let token = '';

  do {
    token = token + Math.floor(Math.random() * 10 ** n).toString(34);
  } while (token.length <= n);

  return token.slice(n * -1);
}

function generateArticleID(articles) {
  const maxArticlesID = articles.reduce(
    (a, c) => (c.id > a ? c.id : a),
    -Infinity
  );

  return maxArticlesID + Math.floor(Math.random() * 1000);
}

function getCurrentTime(format) {
  const d = new Date();
  const f = (t) => (t < 10 ? '0' + t : t);

  const replaceTable = {
    '[d]': () => f(d.getDate()),
    '[sy]': () => `${d.getFullYear()}`.slice(-2),
    '[mt]': () => f(d.getMonth() + 1),
    '[h]': () => f(d.getHours()),
    '[m]': () => f(d.getMinutes()),
    '[s]': () => f(d.getSeconds()),
  };

  format.split(/[^[\w\]]/g).forEach((variable) => {
    const fixedVar = variable.replace(/\s/g, '');

    if (replaceTable[variable] !== undefined) {
      format = format.replace(variable, replaceTable[fixedVar]());
    }
  });

  return format;
}

function saveDataBase(db) {
  localStorage.setItem(config.DATABASE_LOCAL_KEY, JSON.stringify(db));
  return 1;
}

function saveTokenList(list) {
  localStorage.setItem(config.TOKEN_LIST_LOCAL_KEY, JSON.stringify(list));
}

function addAndSaveToken(token, userID) {
  tokeList.push({
    token,
    id: userID,
  });

  saveTokenList(tokeList);

  return 1;
}

function deleteToken(token) {
  const length = tokeList.length;
  tokeList = tokeList.filter((tokenItem) => tokenItem.token !== token);
  saveTokenList(tokeList);

  return tokeList.length !== length;
}

function checkPairTokenAndId(token, id) {
  token = String(token);
  id = Number(id);

  return (
    tokeList.find((ti) => ti.token === token && ti.id === id) !== undefined
  );
}

function initServer() {
  const DBInLocalStorage = localStorage.getItem(config.DATABASE_LOCAL_KEY);
  const tokenListInLocalStorage = localStorage.getItem(
    config.TOKEN_LIST_LOCAL_KEY
  );

  tokeList =
    tokenListInLocalStorage !== null ? JSON.parse(tokenListInLocalStorage) : [];

  if (DBInLocalStorage !== null) {
    DataBase = DBInLocalStorage;
  } else {
    DataBase = defaultDB;
    localStorage.setItem(config.DATABASE_LOCAL_KEY, DataBase);
  }

  const parsedDB = JSON.parse(DataBase);
  const DBTools = initDBTools(parsedDB);

  const log = (...m) => {
    if (config.showLogs === true) {
      console.log('\n' + config.prefix, ...m, '\n\n');
    }
  };

  const getApi = {
    '/user': (id) => {
      const user = {
        ...parsedDB.users.find((user) => Number(user.id) === Number(id)),
      };
      delete user.password;
      return user;
    },
    '/articles': ({ from = 0, to = 10, arrOfId = null }) => {
      // prod
      const response = {
        success: null,
        articles: [],
        paginationPages: Math.ceil(parsedDB.articles.length / 10),
      };

      if (arrOfId !== null) {
        response.articles = parsedDB.articles.filter((article) => {
          return arrOfId.includes(article.id);
        });
      } else {
        response.articles = parsedDB.articles.slice(from, to);
      }

      return response;
    },
    '/article': (id) =>
      parsedDB.articles.find((article) => Number(article.id) === Number(id)),
    '/articles-by-tag': ({ tag, from = 0, to = 10 }) => {
      const articles = parsedDB.articles
        .reduce((acc, curr) => {
          if (curr.tags.includes(tag)) {
            acc.push(curr);
          }

          return acc;
        }, [])
        .slice(from, to);

      const response = {
        success: true,
        articles,
        paginationPages: Math.ceil(articles.length / 10),
      };

      return response;
    },
    '/articles-by-tag-count': (tag) => {
      return parsedDB.articles.filter((a) => a.tags.includes(tag)).length;
    },
    '/popular-tags': () => {
      return parsedDB.articles
        .reduce((acc, article) => {
          article.tags.forEach((tag) => {
            let tagInAcc = acc.find((t) => t[0] === tag);

            if (tagInAcc === undefined) {
              acc.push([tag, 1]);
            } else {
              tagInAcc[1]++;
            }
          });

          return acc;
        }, [])
        .sort((a, b) => b[1] - a[1])
        .map((t) => t[0])
        .filter((t, i) => i < 10);
    },
  };

  const postApi = {
    '/registration': (newUser = {}) => {
      const parsedUser = JSON.parse(newUser);

      const fieldsValidation = {
        email: /^.{3,}@.{2,}\..{2,7}/g,
        login: /[^0-9\s\r+]{1}[a-z\-_0-9]{5,30}/gi,
        password: /.{6,100}/g,
        // name: /[a-z]{5,100}/gi,
        // about: /.{0,300}/g,
      };

      const defaultAvatar =
        'https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/300/000000/external-user-interface-kiranshastry-lineal-kiranshastry.png';

      let response = {
        success: null,
      };

      if (
        parsedDB.users.find((u) => u.login === parsedUser.login) !== undefined
      ) {
        response.success = false;
        response.msg = 'login already exist';
      } else {
        response.success = true;
      }

      if (response.success) {
        for (let rule in fieldsValidation) {
          const haveField =
            parsedUser[rule] === null || parsedUser[rule] === undefined;

          if (haveField || !fieldsValidation[rule].test(parsedUser[rule])) {
            response.success = false;
            response.msg = `${rule} is incorrect`;
            break;
          }
        }
      }

      if (response.success) {
        const newUser = {
          email: parsedUser.email,
          login: parsedUser.login,
          password: parsedUser.password,
          avatar: defaultAvatar,
          about: '',
          name: '',
          commented: [],
          posts: [],
        };

        // set free user id
        newUser.id =
          parsedDB.users.reduce((a, c) => (c.id > a ? c.id : a), -Infinity) +
          Math.floor(Math.random() * 100);

        // add new user to response
        response.user = newUser;

        // add new user to base and local storage
        parsedDB.users.push(newUser);
        saveDataBase(parsedDB);

        // auto login for auto registration token
        response.token = postApi['/login'](response.user).token;
      }

      return response;
    },
    '/auto-login': (token) => {
      token = JSON.parse(token);

      const response = {
        success: null,
        msg: '',
        userData: null,
      };

      const tokenData = tokeList.find((ti) => ti.token === token);

      if (tokenData !== undefined) {
        const user = parsedDB.users.find(
          (user) => Number(user.id) === Number(tokenData.id)
        );

        if (user !== undefined) {
          response.userData = JSON.parse(JSON.stringify(user));
          delete response.userData.password;

          response.success = true;
          response.msg = 'ok';
        } else {
          response.success = false;
          response.msg = `cannot find user with token.id [${tokenData.id}]`;
        }
      } else {
        response.success = false;
        response.msg = 'token is not defined';
      }

      return response;
    },
    '/login': ({ login, password }) => {
      const response = {
        userData: null,
        success: null,
        msg: '',
      };

      log(login, password);

      const user = parsedDB.users.find(
        (u) =>
          String(u.login) === String(login) &&
          String(u.password) === String(password)
      );

      if (user !== undefined) {
        const cleanUser = JSON.parse(JSON.stringify(user));
        delete cleanUser.password;

        response.userData = cleanUser;
        response.msg = 'ok';
        response.success = true;

        response.token = generateToken();
        addAndSaveToken(response.token, cleanUser.id);
      } else {
        response.success = false;
        response.msg = 'incorrect login or password';
      }

      return response;
    },
    '/logout': (token) => {
      const response = {
        success: deleteToken(token),
      };

      return response;
    },
    '/edit-account': ({ user, newData, token }) => {
      user = JSON.parse(JSON.stringify(user));
      newData = JSON.parse(JSON.stringify(newData));

      const response = {
        success: false,
      };

      const accessIsValid = checkPairTokenAndId(token, user.id);

      if (!accessIsValid) {
        response.msg = 'Access denied. Pair "token" and "userID" is not find.';
        return response;
      }

      const subtractFields = ['id', 'posts', 'commented', 'login'];

      parsedDB.articles.forEach((article) => {
        if (article.author.id === user.id) {
          for (let field in newData) {
            if (
              !subtractFields.includes(field) &&
              article.author[field] !== undefined
            ) {
              article.author[field] = newData[field];
            }
          }
        }

        article.comments.forEach((comment) => {
          if (comment.author.id === user.id) {
            for (let field in newData) {
              if (
                !subtractFields.includes(field) &&
                article.author[field] !== undefined
              ) {
                article.author[field] = newData[field];
              }
            }
          }
        });
      });

      const userInDb = parsedDB.users.find((u) => u.id === user.id);

      if (userInDb !== undefined) {
        for (let field in newData) {
          if (
            !subtractFields.includes(field) &&
            userInDb[field] !== undefined
          ) {
            userInDb[field] = newData[field];
          }
        }
        response.success = true;
        response.userData = userInDb;
      }

      saveDataBase(parsedDB);
      return response;
    },
    '/new-article': ({ articleData, token, userID }) => {
      const response = {
        success: null,
        msg: '',
      };

      const accessIsValid = checkPairTokenAndId(token, userID);

      if (accessIsValid === true) {
        const newArticle = {
          title: articleData.title,
          body: articleData.content,
          img: articleData.img,
          tags: articleData.tags?.map((tag) => tag.trim()) || [],
          comments: [],
          id: generateArticleID(parsedDB.articles),
          creationDate: getCurrentTime('[d].[mt].[sy], at: [h]:[m]'),
        };

        const author = parsedDB.users.find((u) => u.id === userID);

        newArticle.author = {
          id: author.id,
          name: author.name,
          avatar: author.avatar,
          login: author.login,
        };

        // checks
        const checks = [
          [articleData.title.length > 2, 'to short title length'],
          [articleData.tags.length > 0, 'need 1+ tags'],
          [articleData.content.length > 99, 'to short article body length'],
        ];

        const failed = [];

        const articleIsValid = checks.every((r) => {
          if (r[0] === false) {
            failed.push(r[1]);
          }

          return r[0];
        });

        if (articleIsValid) {
          response.success = true;
          response.msg = 'ok';
          response.newArticleID = newArticle.id;

          parsedDB.articles.unshift(newArticle);
          parsedDB.users.forEach((user) => {
            if (user.id === userID) {
              user.posts.unshift(newArticle.id);
            }
          });

          saveDataBase(parsedDB);
        } else {
          response.success = false;
          response.msg = `failed validation: ${failed.join(', ')}`;
        }
      } else {
        response.success = false;
        response.msg = 'Auth error: "token-id" pair not found. Access denied';
      }

      return response;
    },
    '/write-comment': ({ commentBody, articleID, token, userID }) => {
      const response = {
        success: null,
        msg: '',
      };

      const accessIsValid = checkPairTokenAndId(token, userID);

      if (accessIsValid === true) {
        if (commentBody.length === 0 || /^\s{0,}$/g.test(commentBody)) {
          response.success = false;
          response.msg = 'Incorrect comment body. Comment empty.';
        } else {
          const article = DBTools.getArticle(articleID);

          if (article !== undefined) {
            const user = DBTools.getUser(userID);

            if (user !== undefined) {
              user.commented.unshift(articleID);
              article.comments.push({
                author: {
                  id: user.id,
                  name: user.name,
                  avatar: user.avatar,
                  login: user.login,
                },
                commentBody,
                time: getCurrentTime('[d]:[mt]:[sy], at: [h]:[m]'),
              });

              saveDataBase(parsedDB);

              response.success = true;
              response.msg = 'ok';
            } else {
              response.success = false;
              response.msg = 'Cannot find user';
            }
          } else {
            response.success = false;
            response.msg = 'Cannot find article';
          }
        }
      } else {
        response.success = false;
        response.msg = 'Auth error: "token-id" pair not found. Access denied';
      }

      return response;
    },
  };

  const deleteApi = {
    '/delete-account': ({ token, id }) => {
      token = String(token);
      id = Number(id);

      const response = {
        success: null,
        msg: '',
      };

      const accessIsValid = checkPairTokenAndId(token, id);

      if (accessIsValid === true) {
        const userIndex = parsedDB.users.findIndex((user) => user.id === id);
        parsedDB.users = parsedDB.users.splice(userIndex, 1);

        response.success = true;
        response.msg = 'ok';
      } else {
        response.success = false;
        response.msg = 'auth error';
      }

      return response;
    },
  };

  const getRandomWaiting = () =>
    Math.floor(
      Math.random() * (config.timing.maxWait - config.timing.minWait) +
        config.timing.minWait
    );

  const makeDBRequest = (url, api, params, logCallback = () => {}) => {
    return new Promise((resolve, reject) => {
      if (api[url] !== undefined) {
        const response = api[url](params);
        const timing = getRandomWaiting();

        setTimeout(() => {
          if (response === undefined) {
            logCallback(false, timing);
            reject({
              url,
              params,
              errCode: 404,
              addedPayload: 'reject in response === undefined',
            });
          } else {
            logCallback(true, timing);
            if (typeof response === 'object') {
              resolve(JSON.parse(JSON.stringify(response)));
            } else {
              resolve(response);
            }
          }
        }, timing);
      } else {
        const timing = getRandomWaiting();
        setTimeout(() => {
          logCallback(false, timing);
          reject({
            url,
            errCode: 404,
          });
        }, timing);
      }
    });
  };

  const server = {
    get(url, params = '') {
      if (typeof params === 'string') {
        log('get', `${url}/${params}`);
      } else {
        log('get', url, params);
      }

      try {
        return makeDBRequest(url, getApi, params, (ok, time) => {
          log(
            `get ${url} is finished:\nwith ${time} ms,\nstatus: ${
              ok ? 'ok' : 'error'
            }`
          );
        });
      } catch (err) {
        log(err);
        return {
          status: 'err',
          errCode: 501,
          err,
        };
      }
    },
    post(url, params) {
      log('post', url);

      try {
        return makeDBRequest(url, postApi, params, (ok, time) => {
          log(
            `post request ${url} is finished with:\n${time} ms,\nstatus: ${
              ok ? 'ok' : 'error'
            }`
          );
        });
      } catch (err) {
        log(err);
        return {
          status: 'err',
          errCode: 501,
          err,
        };
      }
    },
    delete(url, params) {
      log('delete', url);

      try {
        return makeDBRequest(url, deleteApi, params, (ok, time) => {
          log(
            `delete request ${url} is finished with:\n${time} ms,\nstatus: ${
              ok ? 'ok' : 'error'
            }`
          );
        });
      } catch (err) {
        log(err);
        return {
          status: 'err',
          errCode: 501,
          err,
        };
      }
    },
  };

  return server;
}

export default initServer;
