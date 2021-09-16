const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto("art_ground", "admin", "root1234", {
  host: "my-database-practice.ctobugrb9z8w.ap-northeast-2.rds.amazonaws.com",
  dialect: "mysql",
  directory: "models",
  port: "13306",
  additional: {
    timestamps: true,
  },
});

auto.run((err) => {
  if (err) {
    console.log("에러 ㅠㅠ");
  }

  console.log(auto.tables);
  console.log(auto.foreignKeys);
});
