import { Injectable } from "@nestjs/common";
import { log } from "console";
import crypto from 'crypto'; // for HashService
import xmlConverter from "xml-js"; // https://www.npmjs.com/package/xml-js


@Injectable()
export class UtilitiesService{
    xmlToJson(xmlString:string, compact:boolean=true):object{
        // log('UtiService >> compact >>',compact);
        let options = {compact: compact, spaces: 4};

        // Convert XML to JSON object
        let result = xmlConverter.xml2js(xmlString, options);

        return result;
    };

    jsonToXml(jsonObject:object, compact:boolean=true):string{
        // log('UtiService >> compact >>',compact);
        let options = {compact: true, ignoreComment: compact, spaces: 4};

        // Convert JSON object to XML
        let result = xmlConverter.js2xml(jsonObject, options);

        return result;
    };
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

📷📚💻📺🎧
⭐✨⚡☄️☁️💨💭♨️🔥💦🧺
✈️🛩️🚀🚚🔗🔨🔍
😼🐎🐇🕊️
🏠📅Ⓜ️👋👏😊👉👌👀
🎀💗💯👥❓⚠️✅❌✔️💬
🌷🌼💐🌹🌸🌺
🌲🌳🌴🌱🌿🍃🍂
🍎🍒🍓🍇🍍🥑🍉🥝🥥🥕🌶️
🥤🥗🍔🍗🍟🥓🧀🍚🍜🍟
🛒🍹🍨❄️☀️🌈💎💍🕑
🪂🎈🪁⛰️⛱️
🥇🏆🥈🎖️🥉
*/