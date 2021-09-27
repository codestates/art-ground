const { comments } = require("./models");

async function deleteTest() {
  const result = await comments.destroy({
    where: {
      id: 3,
    },
  });
  console.log(result);
}

deleteTest();
