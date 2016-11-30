var RELOAD_DB = false;//Important ONLY DEVELOPER MODE
var fs = require("fs");

module.exports = function (file) {
    var exists = fs.existsSync(file);
    if (!exists) {
        console.log("Creating DB file.");
        fs.openSync(file, "w");
    }
    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(file);
    if (!exists || RELOAD_DB) {
        db.serialize(function () {
            initTables(db);
            initData(db);
        });
    }
    db.close();
}


function initTables(db) {
    db.run("CREATE TABLE user (id INTEGER PRIMARY KEY NOT NULL,"
        + "login TEXT UNIQUE,"
        + "token,"
        + "series,"
        + "password TEXT)");

    db.run("CREATE TABLE character (id INTEGER PRIMARY KEY NOT NULL,"
        + "name,"
        + "attribute,"
        + "image,"
        + "HP, MP, "
        + "HPreg, MPreg,"
        + "physical_def, energy_def,"
        + "move_speed, attack_speed)");

    db.run("CREATE TABLE guide (id INTEGER PRIMARY KEY NOT NULL,"
        + "user_id INTEGER REFERENCES user(id),"
        + "character_id INTEGER REFERENCES character(id),"
        + "skills,"
        + "guide_cards1_id INTEGER REFERENCES guide_cards(id),"
        + "guide_cards2_id INTEGER REFERENCES guide_cards(id),"
        + "guide_cards3_id INTEGER REFERENCES guide_cards(id),"
        + "guide_cards4_id INTEGER REFERENCES guide_cards(id),"
        + "guide_cards5_id INTEGER REFERENCES guide_cards(id),"
        + "guide_cards6_id INTEGER REFERENCES guide_cards(id))");

    db.run("CREATE TABLE guide_cards (id INTEGER PRIMARY KEY NOT NULL,"
        + "basecard_id INTEGER REFERENCES cards(id),"
        + "update1_id INTEGER REFERENCES cards(id),"
        + "update2_id INTEGER REFERENCES cards(id),"
        + "update3_id INTEGER REFERENCES cards(id))");

    db.run("CREATE TABLE cards (id INTEGER PRIMARY KEY NOT NULL,"
        + "type INTEGER," //0 - Basecard, 1 - update
        + "name,"
        + "image,"
        + "properties"
        + " )");

}
function initData(db) {

    var stmt = db.prepare("INSERT INTO user VALUES(?,?,?,?,?)");

    stmt.run("0", "admin", "", "", "admin");

    stmt.finalize();



    stmt = db.prepare("INSERT INTO character VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");

    stmt.run("0", "GRIM.exe", "Порча/Интеллект", "http://paragon-gb.ru/wp-content/uploads/2016/08/Grimexe_pic.jpg", " 400(+100)", " 200(+21.5)", " 0,8(+0.2)", " 0,8(+0.086)", " 11(+1.2)", " 11(+1.2)", " 450", " 100(+2.8%)");
    stmt.run("1", "Гаджет", "Интеллект/Порядок", "http://paragon-gb.ru/wp-content/uploads/2016/08/Gadget_pic.jpg", " 400(+100)", " 200(+25.8)", " 1(+0.2)", " 0,8(+0.1032)", " 6(+0.6)", " 6(+0.6)", " 450", " 100(+0%)");
    stmt.run("2", "Гидеон", "Порча/Интеллект", "http://paragon-gb.ru/wp-content/uploads/2016/08/Gideon_pic.jpg", "  400(+100)", " 200(+25.8)", " 1(+0.2)", " 0,8(+0.1032)", "6(+0.6)", "6(+0.6)", " 450", "100(+0%)");
    stmt.run("3", "Графиня", "Порча/Рост", "http://paragon-gb.ru/wp-content/uploads/2016/10/Countess-pis.jpg", " 441(+94.5)", " 180(+19.35)", " 0.882(+0.189)", " 0.6(+0.1)", " 6(+0.6)", " 6(+0.6)", " 472.5", " 100(+0%)");
    stmt.run("4", "Грейстоун", "Ярость/Порядок", "http://paragon-gb.ru/wp-content/uploads/2016/08/Greystone_pic.jpg", " 505(+115)", " 160(+17.2)", " 0.8(+0.2)", " 0.6(+0.08)", " 22(+2.4)", " 22(+2.4)", " 472.5", " 100(+0%)");
    stmt.run("5", "Грукс", "Порча/Ярость", "http://paragon-gb.ru/wp-content/uploads/2016/08/Grux_pic.jpg", " 450(+115)", " 160(+17.2)", " 0.9(+0.234)", " 0.6(+0.0688)", " 22(+2.4)", " 22(+2.4)", " 472.5", " 100(+0.6%)");
    stmt.run("6", "Деккер", "Рост/Порядок", "http://paragon-gb.ru/wp-content/uploads/2016/08/Dekker_pic.jpg", " 400(+85)", " 200(+25.8)", " 0.85(+0.17)", " 0.8(+0.1032)", " 6(+0.6)", " 6(+0.6)", " 450", " 100(+0%)");
    stmt.run("7", "Игги & Скорч", "Порча/Ярость", "http://paragon-gb.ru/wp-content/uploads/2016/08/IggyScorch_pic.jpg", " 400(+100)", " 200(+25.8)", " 1(+0.2)", " 0.8(+0.1032)", " 6(+0.6)", " 6(+0.6)", " 450", " 100(+0%)");
    stmt.run("8", "Каллари", "Порча/Интеллект", "http://paragon-gb.ru/wp-content/uploads/2016/08/Kallari_pic.jpg", " 441(+94.5)", " 180(+19.35)", " 0.882(+0.189)", " 0.6(+0.1)", " 6(+0.6)", " 6(+0.6)", " 472.5", " 100(+0%)");
    stmt.run("9", "Кванг", "Порча/Порядок", "http://paragon-gb.ru/wp-content/uploads/2016/09/Kwang-pic.jpg", " 450(+106.3)", " 160(+16.06)", " 0.9(+0.213)", " 0.06(+0.06)", " 11(+1.12)", " 11(+1.12)", " 450", " 100(+0.56%)");
    stmt.run("10", "Лейтенант Белика ", "Интеллект/Порядок", "http://paragon-gb.ru/wp-content/uploads/2016/09/LtBelica_pic.jpg", " 400(+100)", " 200(+25.8)", " 1.0(+0.2)", " 0.8(+0.1032)", " 6(+0.6)", " 15(+15)", " 450", " 100(+0%)");
    stmt.run("11", "Мердок", "Ярость/Интеллект", "http://paragon-gb.ru/wp-content/uploads/2016/08/Murdock_pic.jpg", " 400(+100)", " 200(+21.5)", " 0.8(+0.2)", " 0.8(+0.086)", " 11(+1.2)", " 11(+1.2)", " 450", " 100(+2.8)");
    stmt.run("12", "Мюриэль", "Рост/Порядок", "http://paragon-gb.ru/wp-content/uploads/2016/08/Muriel_pic.jpg", " 400(+100)", " 200(+25.8)", " 1(+0.2)", " 0.8(+0.1032)", " 6(+0.6)", " 6(+0.6)", " 450", " 100(+0%)");
    stmt.run("13", "Нарбаш", "Рост/Порядок", "http://paragon-gb.ru/wp-content/uploads/2016/08/Narbash_pic-1.jpg", " 450(+115)", " 160(+17.2)", " 0.9(+0.225)", " 0.6(+0.08)", " 22(+2.4)", " 22(+2.4)", " 472.5", " 100(+0%)");
    stmt.run("14", "Ремпейдж", "Ярость/Рост", "http://paragon-gb.ru/wp-content/uploads/2016/08/Rampage_pic.jpg", " 405(+103.6)", " 160(+17.2)", " 0.8(+0.21)", " 0.64(0.08)", " 22(+2.4)", " 22(+2.4)", " 472.5", " 100(+0%)");
    stmt.run("15", "Риктор", "Порча/Интеллект", "http://paragon-gb.ru/wp-content/uploads/2016/08/Riktor_pic.jpg", " 450(+115)", " 160(+17.25)", " 0.9(+0.225)", " 0.6(+0.08)", " 22(+2.4)", " 22(+2.4)", " 472.5", " 100(+1.4%)");
    stmt.run("16", "Севарог", "Порча/Рост", "http://paragon-gb.ru/wp-content/uploads/2016/08/Sevarog_pic.jpg", " 450(+115)", " 160(+17.2)", " 0.9(+0.225)", " 0.6(+0.08)", " 22(+2.4)", " 22(+2.4)", " 472.5", " 100(+0%)");
    stmt.run("17", "Спэрроу", "Рост/Порядок", "http://paragon-gb.ru/wp-content/uploads/2016/08/Sparrow_pic.jpg", " 400(+100)", " 200(+21.5)", " 0,8(+0.2)", " 0,8(+0.086)", " 11(+1.2)", " 11(+1.2)", " 450", " 100(+0%)");
    stmt.run("18", "Стил", "Интеллект/Порядок", "http://paragon-gb.ru/wp-content/uploads/2016/08/Steel_pic.jpg", " 450(+115)", " 160(+17.2)", " 0.9(+0.225)", " 0.64(+0.08)", " 22(+2.4)", " 22(+2.4)", " 472.5", " 100(+0%)");
    stmt.run("19", "Твинбласт", "Ярость", "http://paragon-gb.ru/wp-content/uploads/2016/08/Twinblast_pic.jpg", " 400(+100)", " 200(+21.5)", " 0,8(+0.2)", " 0,8(+0.086)", " 11(+1.2)", " 11(+1.2)", " 450", " 100(+0%)");
    stmt.run("20", "Фэнг Мао", "Ярость/Порядок", "http://paragon-gb.ru/wp-content/uploads/2016/08/FengMao_pic.jpg", " 405(+104)", " 160(+17.2)", " 0.8(+0.2)", " 0.64(0.08)", " 22(+2.4)", " 22(+2.4)", " 472.5", " 100(+0%)");
    stmt.run("21", "Фея", "Рост/Интеллект", "http://paragon-gb.ru/wp-content/uploads/2016/08/Fey_pic.jpg", " 400(+100)", " 200(+25.8)", " 1(+0.2)", " 0,8(+0.1032)", " 6(+0.6)", " 6(+0.6)", " 450", " 100(+0%)");
    stmt.run("22", "Химера", "Ярость", "http://paragon-gb.ru/wp-content/uploads/2016/08/Khaimera_pic.jpg", " 450(+115)", " 160(+17.2)", " 1.08(+0.234)", " 0.64(+0.688)", " 13.2(+0.8)", " 13.2(+0.8)", " 472.5", " 100(+0.6%)");
    stmt.run("23", "Хотвитцер", "Ярость/Интеллект", "http://paragon-gb.ru/wp-content/uploads/2016/08/Howitzer_pic.jpg", " 400(+100)", " 200(+25.8)", " 1(+0.2)", " 0,8(+0.1032)", " 6(+0.6)", " 6(+0.6)", " 450", " 100(+0%)");

    stmt.finalize();



    stmt = db.prepare("INSERT INTO cards VALUES (?,?,?,?,?)");

    stmt.run("0", "1", "Базовая Искра ", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "0.3 восстановление Маны");
    stmt.run("1", "1", "Базовая Мана ", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png ", "75 Мана");
    stmt.run("2", "1", "Базовый Хроно ", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png ", "2.5% Ускорение перезарядки");
    stmt.run("3", "1", "Малая Кинетика", "http://paragon-gb.ru/wp-content/uploads/2016/08/minor_kinetic.png ", "5.5 Скорость атаки");
    stmt.run("4", "1", "Малая Рана ", "http://paragon-gb.ru/wp-content/uploads/2016/08/minor_wound.png ", "3% Шанс критического удара");
    stmt.run("5", "1", "Малое Заклинание", "http://paragon-gb.ru/wp-content/uploads/2016/08/minor_cast.png ", "6.5 Энергетический урон");
    stmt.run("6", "1", "Малое Здоровье ", "http://paragon-gb.ru/wp-content/uploads/2016/08/lesser_health.png ", "100 Здоровье");
    stmt.run("7", "1", "Малое Истощение", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png ", "2.5 Вампиризм");
    stmt.run("8", "1", "Малое Лечение", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "1.4 Восстановление здоровья");
    stmt.run("9", "1", "Малое Пробивание", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "16 Физическое пробивание");
    stmt.run("10", "1", "Малый Барьер", "http://paragon-gb.ru/wp-content/uploads/2016/08/minor_barrier.png ", "22 Энергетическая броня");
    stmt.run("11", "1", "Малый Блок", " http://paragon-gb.ru/wp-content/uploads/2016/08/minor_guard.png ", "22 Физическая броня");
    stmt.run("12", "1", "Малый Удар", "http://paragon-gb.ru/wp-content/uploads/2016/08/minor_strike.png", "6.5 Физический урон");
    stmt.run("13", "1", "Малый Шок", " http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "16 Энергетическое пробивание");
    stmt.run("14", "1", "Заклинание", "http://paragon-gb.ru/wp-content/uploads/2016/08/cast.png", "18 Энергетический урон");
    stmt.run("15", "1", "Здоровье", "http://paragon-gb.ru/wp-content/uploads/2016/08/health.png", "200 Здоровье");
    stmt.run("16", "1", "Большая Преграда", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "66 Энергетическая броня");
    stmt.run("17", "1", "Большая Рана", "http://paragon-gb.ru/wp-content/uploads/2016/08/major_wound.png", "9% Шанс критического удара");
    stmt.run("18", "1", "Большое Заклинание", "http://paragon-gb.ru/wp-content/uploads/2016/08/major_cast.png", "19.5 Энергетический урон");
    stmt.run("19", "1", "Большое Здоровье", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "300 Здоровье");
    stmt.run("20", "1", "Большое Истощение", "http://paragon-gb.ru/wp-content/uploads/2016/08/greater_drain.png", "7.5 Вампиризм");
    stmt.run("21", "1", "Большое Пробивание", "http://paragon-gb.ru/wp-content/uploads/2016/08/major_pierce.png", "48 Физическое пробивание");
    stmt.run("22", "1", "Большой Блок", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "66 Физическая броня");
    stmt.run("23", "1", "Большой Удар", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "19.5 Физический урон");
    stmt.run("24", "1", "Большй Шок", "http://paragon-gb.ru/wp-content/uploads/2016/08/major_shock.png", "48 Энергетический урон");
    stmt.run("25", "1", "Мощное Исцеление", "http://paragon-gb.ru/wp-content/uploads/2016/08/greater_heal.png", "4.2 Восстановление здоровья");
    stmt.run("26", "1", "Развитая Искра", "http://paragon-gb.ru/wp-content/uploads/2016/08/advanced_spark.png", "0.9 Восстановление маны");
    stmt.run("27", "1", "Развитая Мана", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "225 Мана");
    stmt.run("28", "1", "Развитый Хроно", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "7.5%Ускорение перезарядки");
    stmt.run("29", "1", "Божественное Здоровье", "http://paragon-gb.ru/wp-content/uploads/2016/08/divine_health.png", "300 Здоровье");
    stmt.run("30", "1", "Божественное Лечение", "http://paragon-gb.ru/wp-content/uploads/2016/08/divine_heal.png", "4.2 Восстановление Здоровья");
    stmt.run("31", "1", "Божественный Барьер", "http://paragon-gb.ru/wp-content/uploads/2016/08/divine_barrier.png", "66 Энергетическая броня");
    stmt.run("32", "1", "Божественный Блок", "http://paragon-gb.ru/wp-content/uploads/2016/08/divine_guard.png", "66 Физическая броня");
    stmt.run("33", "1", "Праведная Рана", "http://paragon-gb.ru/wp-content/uploads/2016/08/righteous_wound.png", "9% Шанс критического удара");
    stmt.run("34", "1", "Чистая Искра", "http://paragon-gb.ru/wp-content/uploads/2016/08/pure_spark.png", "0.9 Восстановление маны");
    stmt.run("35", "1", "Чистая Мана", "http://paragon-gb.ru/wp-content/uploads/2016/08/pure_mana.png", "225 Мана");
    stmt.run("36", "1", "Прицельное Истощение", "http://paragon-gb.ru/wp-content/uploads/2016/08/3_int_common.png", "7.5 Вампиризм");
    stmt.run("37", "1", "Прицельное Пробивание", "http://paragon-gb.ru/wp-content/uploads/2016/08/focused_pierce.png", "48 Физическое пробивание");
    stmt.run("38", "1", "Прицельный Шок", "http://paragon-gb.ru/wp-content/uploads/2016/08/focused_shock.png", "48 Энергетический урон");
    stmt.run("39", "1", "Ужасная Рана", "http://paragon-gb.ru/wp-content/uploads/2016/08/3_corr_uncommon.png", "9% Шанс критического удара");
    stmt.run("40", "1", "Ужасное Пробивание", "http://paragon-gb.ru/wp-content/uploads/2016/08/3_corr_uncommon.png", "48 Физическое пробивание");
    stmt.run("41", "1", "Ужасный Шок", "http://paragon-gb.ru/wp-content/uploads/2016/08/3_corr_uncommon.png", "48 Энергетическая броня");
    stmt.run("42", "1", "Жестокая Кинетика", "http://paragon-gb.ru/wp-content/uploads/2016/08/brutal_kinetic.png", "16.5 Скорость атаки");
    stmt.run("43", "1", "Свирепый Хроно", "http://paragon-gb.ru/wp-content/uploads/2016/09/fierce_chrono.png", "7.5% Ускорение перезарядки");
    stmt.run("44", "1", "Бета-барьер", "http://paragon-gb.ru/wp-content/uploads/2016/08/beta_barrier.png", "66 Энергетическая броня");
    stmt.run("45", "1", "Бета-блок", "http://paragon-gb.ru/wp-content/uploads/2016/08/beta_guard.png", "66 Физическая броня");
    stmt.run("46", "1", "Бета-здоровье", "http://paragon-gb.ru/wp-content/uploads/2016/08/beta_health.png", "400 здоровье");
    stmt.run("47", "1", "Идеавльная Искра", "http://paragon-gb.ru/wp-content/uploads/2016/08/perfect_spark.png", "1.2 Восстановление маны");
    stmt.run("48", "1", "Идеальная Мана", "http://paragon-gb.ru/wp-content/uploads/2016/08/perfect_mana.png", "300 Мана");
    stmt.run("49", "1", "Небесное Здоровье", "http://paragon-gb.ru/wp-content/uploads/2016/08/celestial_health.png", "400 Здоровье");
    stmt.run("50", "1", "Небесное Лечение", "http://paragon-gb.ru/wp-content/uploads/2016/08/celestial_heal.png", "5.6 Восстановление здоровья");
    stmt.run("51", "1", "Небесный Барьер", "http://paragon-gb.ru/wp-content/uploads/2016/08/celestial_barrier.png", "88 Энергетическая броня");
    stmt.run("52", "1", "Небесный Блок", "http://paragon-gb.ru/wp-content/uploads/2016/08/celestial_guard.png", "88 Физическая броня");
    stmt.run("53", "1", "Рьяная Рана", "http://paragon-gb.ru/wp-content/uploads/2016/08/zealous_wound.png", "12% Шанс критического удара");
    stmt.run("54", "1", "Концентрированное Истощение", "http://paragon-gb.ru/wp-content/uploads/2016/08/concentrated_drain.png", "10 Вампиризм");
    stmt.run("55", "1", "Концентрированное Пробивание", "http://paragon-gb.ru/wp-content/uploads/2016/08/concentrated_pierce.png", "64 Физическое пробивание");
    stmt.run("56", "1", "Концентрированный Шок", "http://paragon-gb.ru/wp-content/uploads/2016/08/concentrated_shock.png", "64 Энергетическая броня");
    stmt.run("57", "1", "Улучшенная Искра", "http://paragon-gb.ru/wp-content/uploads/2016/08/enchanced_spark.png", "1.2 Восстановление маны");
    stmt.run("58", "1", "Улучшенная Мана", "http://paragon-gb.ru/wp-content/uploads/2016/08/enchanced_mana.png", "300 Мана");
    stmt.run("59", "1", "Зловещая Рана", "http://paragon-gb.ru/wp-content/uploads/2016/08/4_corr_uncommon.png", "12% Шанс критического удара");
    stmt.run("60", "1", "Зловещее Пробивание", "http://paragon-gb.ru/wp-content/uploads/2016/08/4_corr_uncommon.png", "64 Физическое пробивание");
    stmt.run("61", "1", "Зловещий Шок", "http://paragon-gb.ru/wp-content/uploads/2016/08/4_corr_uncommon.png", "64 Энергетическая броня");
    stmt.run("62", "1", "Ужасное Истощение", "http://paragon-gb.ru/wp-content/uploads/2016/08/card-no-name.png", "10 Вампиризм");
    stmt.run("63", "1", "Беспощадная Кинетика", "http://paragon-gb.ru/wp-content/uploads/2016/08/vicious_kinetic.png", "22 Скорость атаки");
    stmt.run("64", "1", "Яростный Хроно", "http://paragon-gb.ru/wp-content/uploads/2016/08/raging_chrono.png", "10% Ускорение перезарядки");
    stmt.run("65", "1", "Бета-лечение", "http://paragon-gb.ru/wp-content/uploads/2016/08/beta_heal.png", "5.6 Восстановление здоровья");
    stmt.run("66", "1", "Оптимальная Искра", "http://paragon-gb.ru/wp-content/uploads/2016/08/optimal_spark.png", "1.5 Восстановление маны");
    stmt.run("67", "1", "Оптимальная Мана", "http://paragon-gb.ru/wp-content/uploads/2016/08/optimal_mana.png", "375 Мана");
    stmt.run("68", "1", "Зловещее Истощение", "http://paragon-gb.ru/wp-content/uploads/2016/08/5_corr_uncommon.png", "12.5 Вампиризм");
    stmt.run("69", "1", "Альфа-барьер", "http://paragon-gb.ru/wp-content/uploads/2016/08/alpha_barrier.png", "110 Энергетическая броня");
    stmt.run("70", "1", "Альфа-здоровье", "http://paragon-gb.ru/wp-content/uploads/2016/08/alpha_health.png", "500 Здоровье");
    stmt.run("71", "1", "Альфа-лечение", "http://paragon-gb.ru/wp-content/uploads/2016/08/alpha_heal.png", "7 Восстановление здоровья");
    stmt.run("72", "1", "Корона Вожака", "http://paragon-gb.ru/wp-content/uploads/2016/08/4_grwth_common.png", "1.4 Восстановление здоровья, 200 Здоровье (Пассивно: Восстановление здоровья находящихся рядом союзников увеличивается на 4.2/сек)");
    stmt.run("73", "0", "Жетон Заклинателя", "http://paragon-gb.ru/wp-content/uploads/2016/09/cast_token.png", "6.5 Энергетический урон");
    stmt.run("74", "0", "Жетон Здоровья", "http://paragon-gb.ru/wp-content/uploads/2016/09/health_token.png", "100 Здоровье");
    stmt.run("75", "0", "Жетон Преграды", "http://paragon-gb.ru/wp-content/uploads/2016/09/barrier_token.png", "22 Энергетическая броня");
    stmt.run("76", "0", "Жетон Стража", "http://paragon-gb.ru/wp-content/uploads/2016/09/guard_token.png", "22 Физическая броня");
    stmt.run("77", "0", "Жетон Удара", "http://paragon-gb.ru/wp-content/uploads/2016/09/strike_token.png", "6.5 Физический урон");
    stmt.run("78", "0", "Ключ Сборщика", "http://paragon-gb.ru/wp-content/uploads/2016/08/harvesters_key.png", "6 сек. время размещения сборщика (Пассивно: Ключ сборщика перезаряжается на базе)");
    stmt.run("79", "0", "Преграда", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "44 Энергетическая броня");
    stmt.run("80", "0", "Пробивание", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "32 Физическое пробивание");
    stmt.run("81", "0", "Рана", "http://paragon-gb.ru/wp-content/uploads/2016/08/wound.png", "6% Шанс критического удара");
    stmt.run("82", "0", "Страж", "http://paragon-gb.ru/wp-content/uploads/2016/08/guard.png", "44 Физическая броня");
    stmt.run("83", "0", "Удар", "http://paragon-gb.ru/wp-content/uploads/2016/08/strike.png", "13 Физический урон");
    stmt.run("84", "0", "Хроно", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "5% Ускорение перезарядки");
    stmt.run("85", "0", "Шок", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "32 Энергетическая пробивание");
    stmt.run("86", "0", "Ключ Жнеца", "http://paragon-gb.ru/wp-content/uploads/2016/08/reapers_key.png", "3 сек. Время размещения сборщика, 6.5 Энергетическая броня, 3% Шанс критического удара (Пассивно: Ключ сборщика перезаряжается на базе)");
    stmt.run("87", "0", "Ключ Палача", "http://paragon-gb.ru/wp-content/uploads/2016/08/executioners_key.png", "3 сек. Время размещения сборщика, 6.5 Физический урон (Пассивно:Ключ сборщика перезаряжается на базе)");
    stmt.run("88", "0", "Зажигательный Поршень", "http://paragon-gb.ru/wp-content/uploads/2016/08/2_fury_common.png", "6.5 Физический урон, 5.5 Скорость атаки(Бонус за полное улучшение: 5.5 Скорость атаки)");
    stmt.run("89", "0", "Красноглазый Нитро", "http://paragon-gb.ru/wp-content/uploads/2016/08/redeye_nitro.png", "5.5 Скорость атаки, 3% Шанс критического удара(Бонус за полное улучшение:5.5 Скорость атаки)");
    stmt.run("90", "0", "Ненавистник", "http://paragon-gb.ru/wp-content/uploads/2016/08/hatespitter.png", "16 Энергетическое пробивание, 2.5% Ускорение перезарядки(Бонус за полное улучшение: 2.5% Ускорение перезарядки)");
    stmt.run("91", "0", "Пламенный Мотор", "http://paragon-gb.ru/wp-content/uploads/2016/08/2_fury_common.png", "16 Физическое пробивание, 2.5% Ускорение перезарядки(Бонус за полное улучшение: 2.5% Ускорение перезарядки)");
    stmt.run("92", "0", "Самоцвет Безумия", "http://paragon-gb.ru/wp-content/uploads/2016/08/madstone_gem.png", "6.5 Энергетический урон, 5.5 Скорость атаки(Бонус за полное улучшение:5.5 Скорость атаки)");
    stmt.run("93", "0", "Агорский Скипетр", "http://paragon-gb.ru/wp-content/uploads/2016/08/agoran_scepter.png", "6.5 Энергетический урон(Бонус за полное улучшение: 50% Критический бонус)");
    stmt.run("94", "0", "Алмазное Лезвие", "http://paragon-gb.ru/wp-content/uploads/2016/08/adamant_edge.png", "6.5 Физический урон, 100 Здоровье(Бонус за полное улучшение:13 Физический урон)");
    stmt.run("95", "0", "Алмазный Посох", "http://paragon-gb.ru/wp-content/uploads/2016/08/staff_of_the_adamant.png", "6.5 Энергетический урон, 100 Здоровье(Бонус за полное улучшение: 13 Энергетический урон)");
    stmt.run("96", "0", "Амулет Ветерана", "http://paragon-gb.ru/wp-content/uploads/2016/08/amulet-_of_the_veteran.png", "6.5 Ф урон, 100 Здоровье(Бонус за полное улучшение: 200 Здоровье)");
    stmt.run("97", "0", "Амулет Мага-Старца", "http://paragon-gb.ru/wp-content/uploads/2016/08/eldermage_amulet.png", "6.5 Энергетический урон,100 Здоровье(Бонус за полное улучшение: 200 Здоровье)");
    stmt.run("98", "0", "Венец Здоровья", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "75 Мана(Пассивно:+4.2/сек Восстановление здоровья находящимся рядом союзникам)");
    stmt.run("99", "0", "Венец Маны", "http://paragon-gb.ru/wp-content/uploads/2016/08/circlet_of_mana.png", "100 Здоровье(Пассивно: +0.9/сек Восстановление маны находящимся рядом союзникам)");
    stmt.run("100", "0", "Диск Хрономанта", "http://paragon-gb.ru/wp-content/uploads/2016/08/chrono-mancer_disk.png", "75 Мана, 6.5 Энергетический урон(Бонус за полное улучшение:5% Скорость перезарядки)");
    stmt.run("101", "0", "Закалённая пластина", "http://paragon-gb.ru/wp-content/uploads/2016/08/tempered_plate.png", "22 Физическая броня, 100 Здоровье(Бонус за полное улучшение: 44 Физическая броня)");
    stmt.run("102", "0", "Клинок Агоры", "http://paragon-gb.ru/wp-content/uploads/2016/08/blade_of_agora.png", "6.5 Физический урон(Бонус за полное улучшение(50% Критический бонус))");
    stmt.run("103", "0", "Ключ Задиры", "http://paragon-gb.ru/wp-content/uploads/2016/08/brawlers_key.png", "3 сек. Время размещения сборщика, 6.5 Физический урон, 75 Мана(Пассивно:Ключ перезаряжается на базе, Бонус за полное улучшение: 6.5 Физический урон)");
    stmt.run("104", "0", "Ключ Мага", "http://paragon-gb.ru/wp-content/uploads/2016/08/magus_key.png", "3 сек. Время размещения сборщика, 6.5 Энергетический урон, 75 Мана(Пассивно:Ключ перезаряжается на базе, Бонус за полное улучшение: 6.5 Физический урон)");
    stmt.run("105", "0", "Ключ Мудреца", "http://paragon-gb.ru/wp-content/uploads/2016/08/sages_key.png", "3 сек. Время размещения сборщика, 6.5 Энергетический урон100 Здоровье(Пассивно:Ключ перезаряжается на базе, Бонус за полное улучшение: 6.5 Физический урон)");
    stmt.run("106", "0", "Ключ Повелителя", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "3 сек. Время размещения сборщика,75 Мана, 100 Здоровье, 2.5% Ускорение перезарядки(Пассивно:Ключ перезаряжается на базе)");
    stmt.run("107", "0", "Ключ Повелителя Зверей", "http://paragon-gb.ru/wp-content/uploads/2016/09/beastmasters_key.png", "3 сек. Время размещения сборщика, 100 Здоровье(Пассивно:Ключ перезаряжается на базе, +15 урона от основных атак по лесным миньонам)");
    stmt.run("108", "0", "Ключ Стража", "http://paragon-gb.ru/wp-content/uploads/2016/08/guardians_key.png", "3 сек. Время размещения сборщика, 6.5 Физический урон, 100 Здоровье(Пассивно:Ключ перезаряжается на базе, Бонус за полное улучшение: 6.5 Физический урон)");
    stmt.run("109", "0", "Копье Охотника Разлома", "http://paragon-gb.ru/wp-content/uploads/2016/08/spear_of_the_rifthunter.png", "6.5 Физический урон, 3% Шанс критического удара (Бонус за полное улучшение: 6.5 Физический урон, 3% Шанс критического удара)");
    stmt.run("110", "0", "Маятник Повелителей", "http://paragon-gb.ru/wp-content/uploads/2016/08/pendulum_of_lords.png", "75 Мана, 100 Здоровье, 2.5 Ускорение перезарядки(Бонус за полное улучшение: 2.5 Ускорение перезарядки)");
    stmt.run("111", "0", "Настроенный Барьер", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "22 Энергетическая броня, 100 Здоровье(Бонус за полное улучшение: 44 Энергетическая броня)");
    stmt.run("112", "0", "Посох Источника", "http://paragon-gb.ru/wp-content/uploads/2016/08/1_uni_common.png", "6.5 Энергетический урон, 75 Мана(13 Энергетический урон)");
    stmt.run("113", "0", "Посох Вихрь", "http://paragon-gb.ru/wp-content/uploads/2016/08/whirling_wand.png", "6.5 Энергетический урон, 5.5 Скорость атаки(Бонус за полное улучшение:6.5 Энергетический урон, 5.5 Скорость атаки)");
    stmt.run("114", "0", "Рассекатель Ветра", "http://paragon-gb.ru/wp-content/uploads/2016/08/windcarver_blade.png", "6.5 Физический урон, 5.5 Скорость атаки(Бонус за полное улучшение: 6.5 Физический урон, 5.5 Скорость атаки)");
    stmt.run("115", "0", "Скипетр Мага Разлома", "http://paragon-gb.ru/wp-content/uploads/2016/08/riftmagus_scepter.png", "6.5 Энергетический урон, 3% Шанс критического удара(Бонус за полное улучшение: 6.5 Энергетический урон.3% Шанс критического удара)");
    stmt.run("116", "0", "Фонтанный Шип", "http://paragon-gb.ru/wp-content/uploads/2016/08/fountain_spike.png", "6.5 Физический урон, 75 Мана(Бонус за полное улучшение: 13 Физический урон)");
    stmt.run("117", "0", "Хроношип", "http://paragon-gb.ru/wp-content/uploads/2016/08/chronospike.png", "75 Мана, 6.5 Физический урон(Бонус за полное улучшение: 5% Ускорение перезарядки)");
    stmt.run("118", "0", "Алтарный Меч", "http://paragon-gb.ru/wp-content/uploads/2016/08/sword_of_the_alter.png", "2.5 Вампиризм(Бонус за полное улучшение: 50 Критический бонус)");
    stmt.run("119", "0", "Золотая Вуаль", "http://paragon-gb.ru/wp-content/uploads/2016/08/golden_veil.png", "22 Энергетическая броня, 6% Шанс критического удара (Бонус за полное улучшение: 22 Энергетическая броня)");
    stmt.run("120", "0", "Камень Нирваны", "http://paragon-gb.ru/wp-content/uploads/2016/08/nirvana_stone.png", "3% Шанс критического удара, 1.4 Восстановление здоровья, 0.3 Мана(Бонус за полное улучшение: 3% Шанс критического удара)");
    stmt.run("121", "0", "Кварцевый Клинок", "http://paragon-gb.ru/wp-content/uploads/2016/08/quartzblade.png", "6.5 Физический урон, 0.3 Восстановление маны, 100 Здоровье(Бонус за полное улучшение: 100 Здоровье)");
    stmt.run("122", "0", "Наступательные Маневры", "http://paragon-gb.ru/wp-content/uploads/2016/08/3_ord_uncommon.png", "6% Шанс критического удара(Пассивно:+44 Физическая броня, +44 Энергетическая броня при получении основных атак)");
    stmt.run("123", "0", "Небесный Бриллиант", "http://paragon-gb.ru/wp-content/uploads/2016/08/celestine_diamond.png", "6.5 Энергетический урон, 1.4 Восстановление здоровья, 75 Мана(Бонус за полное улучшение: 75 Мана)");
    stmt.run("124", "0", "Пластина Светлой Стали", "http://paragon-gb.ru/wp-content/uploads/2016/08/brightsteel_plate.png", "22 Физическая броня, 6% Шанс критического удара(Бонус за полное улучшение: 22 Физическая броня)");
    stmt.run("125", "0", "Райский Бриллиант", "http://paragon-gb.ru/wp-content/uploads/2016/08/elysian_diamond.png", "6.5 Энергетический урон, 0.3 Восстановление маны, 100 Здоровье(Бонус за полное улучшение: 100 Здоровье)");
    stmt.run("126", "0", "Серебрянное Копье", "http://paragon-gb.ru/wp-content/uploads/2016/08/silverspear.png", "6.5 Физический урон, 1.4 Восстановление здоровья, 75 Мана(Бонус за полное улучшение: 75 Мана)");
    stmt.run("127", "0", "Факел Зарождения", "http://paragon-gb.ru/wp-content/uploads/2016/08/genesis_torch.png", "16 Энергетическое пробивание, 22 Физическая броня, 2.5% Ускорение перезарядки(Бонус за полное улучшение: 2.5% Ускорение перезарядки)");
    stmt.run("128", "0", "Фонарь Весны", "http://paragon-gb.ru/wp-content/uploads/2016/08/lantern_of_spring.png", "16 Энергетическое пробивание, 22 Физическая броня, 2.5% Ускорение перезарядки(Бонус за полное улучшение: 2.5% Ускорение перезарядки))");
    stmt.run("129", "0", "Жетон Целителя", "http://paragon-gb.ru/wp-content/uploads/2016/09/healer_token.png", "2.8 Восстановление здоровья");
    stmt.finalize();



    stmt = db.prepare("INSERT INTO guide_cards VALUES (?,?,?,?,?)");

    stmt.run("0", "0", "0", "0", " null");
    stmt.run("1", "0", "1", "0", " null");

    stmt.finalize();



    stmt = db.prepare("INSERT INTO guide VALUES (?,?,?,?,?,?,?,?,?,?)");

    stmt.run("0", "0", "0", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("1", "0", "1", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("2", "0", "2", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("3", "0", "3", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("4", "0", "4", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("5", "0", "5", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("6", "0", "6", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("7", "0", "7", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("8", "0", "8", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("9", "0", "9", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("10", "0", "10", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("11", "0", "11", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("12", "0", "12", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("13", "0", "13", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("14", "0", "14", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("15", "0", "15", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("16", "0", "16", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("17", "0", "17", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("18", "0", "18", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("19", "0", "19", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("20", "0", "20", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("21", "0", "21", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("22", "0", "22", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.run("23", "0", "23", "{{0,1,0},{0,0,1}}", "0", "1", "null", "null", "null", "null");
    stmt.finalize();

}

