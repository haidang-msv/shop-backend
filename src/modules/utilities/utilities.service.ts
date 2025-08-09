import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import crypto from 'crypto'; // for HashService
import xmlConverter from "xml-js"; // https://www.npmjs.com/package/xml-js


@Injectable()
export class UtilitiesService{
    constructor(
        private readonly config:ConfigService
    ){};

    xmlToJson(xmlString:string, compact:boolean=true):object{
        // console.log('UtiService >> compact >>',compact);
        let options = {compact: compact, spaces: 4};

        // Convert XML to JSON object
        let result = xmlConverter.xml2js(xmlString, options);

        return result;
    };

    jsonToXml(jsonObject:object, compact:boolean=true):string{
        // console.log('UtiService >> compact >>',compact);
        let options = {compact: true, ignoreComment: compact, spaces: 4};

        // Convert JSON object to XML
        let result = xmlConverter.js2xml(jsonObject, options);

        return result;
    };

    log (...data:unknown[]) {
        let envStr = 'app.env', debugStr = 'app.debug', loggingStr = 'app.logging';
        let isLogging = false;
        // console.log('UtilitiesService >> log >>', envStr,'=', this.config.get<string>(envStr));
        // console.log('UtilitiesService >> log >>', debugStr,'=', this.config.get<string>(debugStr));
        // console.log('UtilitiesService >> log >>', loggingStr,'=', this.config.get<string>(loggingStr));
        if (this.config.get<string>(envStr) === 'development') isLogging = true;
        else if (this.config.get<boolean>(debugStr) === true
            || this.config.get<string>(debugStr) === 'true'
            || this.config.get<string>(debugStr) === 'yes'
            || this.config.get<number>(debugStr) === 1) isLogging = true;
        else if (this.config.get<boolean>(loggingStr) === true
            || this.config.get<string>(loggingStr) === 'true'
            || this.config.get<string>(loggingStr) === 'yes'
            || this.config.get<number>(loggingStr) === 1) isLogging = true;
        if (isLogging) console.log('🧾 ',...data);
    }
}

@Injectable()
export class HashService{
    generateMd5(inputString:string):string {
        /*
        createHash('md5'); // Create an MD5 hash object.
        update(inputString): Update the hash object with the input data.
        digest('hex'): method calculates the final hash.
        You can specify the encoding (e.g., 'hex', 'base64').
        */
        const hash = crypto.createHash('md5').update(inputString).digest('hex');
        // console.log('generateMd5 >> ', hash);
        return hash.toUpperCase(); // = select convert(varchar(32), hashbytes('MD5', inputString), 2)
    };

    generateSha256(inputString) {
        /*
        createHash('md5'); // Create an MD5 hash object.
        update(inputString): Update the hash object with the input data.
        digest('hex'): method calculates the final hash.
        You can specify the encoding (e.g., 'hex', 'base64').
        */
        const hash = crypto.createHash('sha256').update(inputString, 'utf8').digest('hex');
        // utiCls.clog('generateSha256 >> ', hash);
        return hash.toUpperCase(); // = select convert(varchar(64), hashbytes('SHA2_256', inputString), 2)
    }
}


/*
https://emojicombos.com/

📷📚💻📺📟🎧🎛️💾🌐🌍🔴💂🟢
⭐✨⚡☄️☁️💨💭♨️💥🔥💦🧺
✈️🛩️🚀🚚🔗⚔️🔨🔍🧬🛠🛠️⚒️🔧⚙️⌘
😼🐎🐇🕊️
🏛️🏠📅
Ⓜ️👋👏😊👉👌👀💀🔔🔒
🎀💗💯👥🚧❓❗⛔⚠️✅❌✔️🗪💬📋🧾📜📝📰#️⃣ℹ️🧩
🌷🌼💐🌹🌸🌺
🌲🌳🌴🌱🌿🍃🍂
🍎🍒🍓🍇🍍🥑🍉🥝🥥🥕🌶️
🥤🥗🍔🍗🍟🥓🧀🍚🍜🍟
🛒🍹🍨❄️☀️🌈💎💍🕑⚜️
🪂🎈🪁⛰️⛱️
🥇🏆🥈🎖️🥉🔰🚩
*/