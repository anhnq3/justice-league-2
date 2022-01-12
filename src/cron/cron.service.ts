import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { db } from 'src/config/db.config';

@Injectable()
export class CronService {
  @Cron('0 0 5 * * *')
  async checkQuantity() {
    const storeDetail = await db.collection('stores').get();
    if (!storeDetail)
      throw new HttpException('Cannot get store', HttpStatus.BAD_REQUEST);
    const storeDoc = storeDetail.docs;
    const stores: any = storeDoc.map((stores) => ({
      id: stores.id,
      ...stores.data(),
    }));
    for (let i = 0; i < stores.length; i++) {
      const { id, itemQuantity, defaultQuantity } = stores[i];
      console.log('id: ', id);
      console.log('itemQuantity: ', itemQuantity);
      console.log('itemDefaultQuantity: ', defaultQuantity);
      if (itemQuantity != defaultQuantity) {
        await db
          .collection('stores')
          .doc(id)
          .update({ itemQuantity: defaultQuantity });
      }
    }
  }
}
