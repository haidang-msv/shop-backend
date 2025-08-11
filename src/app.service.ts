import { Injectable } from '@nestjs/common';
import { clog, xmlToJson, jsonToXml, generateMd5, generateSha256 } from 'helpers/utilities';

@Injectable()
export class AppService {

  getHello(): string {
    // const xmlString = `<root><item id="1">Value 1</item><item id="2">Value 2</item></root>`;
    // try {
    //   const jsonObj = xmlToJson(xmlString);
    //   clog('AppService >> jsonObj >>', jsonObj);
    // } catch (error) {
    //   clog('AppService >> error >>',error);
    // }

    // const jsonObject = {
    //     name: 'Product',
    //     id: '123',
    //     details: {
    //         price: 29.99,
    //         currency: 'USD'
    //     },
    //     tags: ['electronics', 'gadget']
    // };
    // try {
    //   const xmlStr = jsonToXml(jsonObject);
    //   clog('AppService >> xmlStr >>', xmlStr);
    // } catch (error) {
    //   clog('AppService >> error >>',error);
    // }

    // clog('AppService >> md5 >>', generateMd5('abc'));
    // clog('AppService >> sha256 >>', generateSha256('abc'));

    let now = new Date();
    return 'Hello World! '.concat('[',now.toLocaleDateString(),' ~ ',now.toLocaleTimeString(),']');
  }
}
