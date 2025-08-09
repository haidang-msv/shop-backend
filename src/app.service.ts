import { HashService, UtilitiesService } from '@modules/utilities/utilities.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly uti:UtilitiesService,
    private readonly hash:HashService,
  ){};

  getHello(): string {
    // const xmlString = `<root><item id="1">Value 1</item><item id="2">Value 2</item></root>`;
    // try {
    //   const jsonObj = this.uti.xmlToJson(xmlString);
    //   this.uti.log('AppService >> jsonObj >>', jsonObj);
    // } catch (error) {
    //   this.uti.log('AppService >> error >>',error);
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
    //   const xmlStr = this.uti.jsonToXml(jsonObject);
    //   this.uti.log('AppService >> xmlStr >>', xmlStr);
    // } catch (error) {
    //   this.uti.log('AppService >> error >>',error);
    // }

    this.uti.log('AppService >> md5 >>', this.hash.generateMd5('abc'));
    this.uti.log('AppService >> sha256 >>', this.hash.generateSha256('abc'));

    let now = new Date();
    return 'Hello World! '.concat('[',now.toLocaleDateString(),' ~ ',now.toLocaleTimeString(),']');
  }
}
