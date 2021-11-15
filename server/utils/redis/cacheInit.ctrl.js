const { exhibition, images, users } = require("../../models");
const { each, keys } = require("underscore");
const { setListCache, setHash } = require("./setCache.ctrl");

const setGrading = (type, id) => {
  type === 1 ? setListCache("standard", id) : setListCache("premium", id);
};
const setExhibitionCache = (exhibitionData) => {
  const { id, exhibit_type } = exhibitionData;
  const exhibitionDataKeys = keys(exhibitionData);
  each(exhibitionDataKeys, (el) => {
    setHash(`exhibition:${id}`, `${el}`, exhibitionData[el]);
  });

  setListCache("allExhibition", id);
  setGrading(exhibit_type, id);
};

const setUserCache = (userData) => {
  const { id } = userData;
  const userDataKeys = keys(userData);
  each(userDataKeys, (el) => {
    setHash(`user:${id}`, `${el}`, userData[el]);
  });
};

module.exports = {
  exhibitionCacheInitialization: () => {
    const exhibitionFindResult = findAll(exhibition, {
      raw: true,
      where: { status: 1 },
    });
    if (exhibitionFindResult) {
      each(exhibitionFindResult, (el) => {
        setExhibitionCache(el);
      });
    }
  },
  imageCacheInitialization: () => {
    const result = findAll(images, { raw: true });
    each(result, (el) => {
      setListCache(`images:${el.exhibition_id}`, JSON.stringify(el));
    });
  },
  userCacheInitialization: () => {
    const result = findAll(users, { raw: true });
    each(result, (el) => {
      setUserCache(el);
    });
  },

  initialize: () => {
    this.exhibitionCacheInitialization();
    this.imageCacheInitialization();
    this.userCacheInitialization();
    //TODO
    /*
      존재하는 exhibition 별로 캐싱 함수 만들기
      ex)exhibition:85
      존재하는 like 캐싱 함수 만들기
      ex)like:64
      Review 캐싱 함수만들기
      review:82
      allExhibition 캐싱 함수 만들기
      primeum 함수 만들기
      standard 함수 만들기
     
     */
  },
  addExhibition: async (exhibitionId) => {
    const exhibitionFindResult = await exhibition.findOne({
      raw: true,
      where: { status: 1, id: exhibitionId },
    });
    setExhibitionCache(exhibitionFindResult);
  },
};
