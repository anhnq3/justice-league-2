import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/config/db.config';
import { paginatedResult } from '../helper/pagination/paginatedResult';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  storesRef = db.collection('stores');
  cardsRef = db.collection('cards');

  async getAllStores(page = 1, limit = 1) {
    const storeDetail = await this.storesRef.get();
    if (!storeDetail)
      throw new HttpException('Cannot get store', HttpStatus.BAD_REQUEST);
    const storeDoc = storeDetail.docs;
    const stores = storeDoc.map((stores: any) => ({
      id: stores.id,
      itemName: stores.data().itemName,
      itemQuantity: stores.data().itemQuantity,
      defaultQuantity: stores.data().defaultQuantity,
      attack: stores.data().attack,
      defence: stores.data().defence,
      lucky: stores.data().lucky,
      agile: stores.data().agile,
    }));
    return paginatedResult(stores, page, limit);
    // return stores;
  }

  async getCardsByStores() {
    const storeDetail = await this.storesRef.get();
    const cardDetail = await this.cardsRef.get();

    const stores = storeDetail.docs;
    const cards = cardDetail.docs;

    const storesData = stores.map((data) => ({ id: data.id, ...data.data() }));
    const cardsData = cards.map((data) => ({ id: data.id, ...data.data() }));

    //Get store id
    //Get items from cards
    //Compare cards items with store id

    const final = [];

    // Logic
    storesData.forEach((data: any) => {
      const storeId = data.id;
      const itemName = data.itemName;
      const cardsArr = [];

      cardsData.forEach((data1: any) => {
        const items = data1.items;
        if (items.length > 0) {
          items.forEach((data2) => {
            if (data2 == storeId) {
              cardsArr.push(data1.id);
            }
          });
        }
      });
      if (cardsArr.length > 0)
        final.push({ id: storeId, itemName: itemName, cards: cardsArr });
    });

    return final;

    // return { storesData, cardsData };
  }

  async createStore(createStoreDto: CreateStoreDto) {
    const { itemQuantity, agile, attack, defence, lucky } = createStoreDto;
    this.notLowerThanZero(itemQuantity, agile, attack, defence, lucky);
    // this.notLowerThanZero(agile);
    // this.notLowerThanZero(attack);
    // this.notLowerThanZero(defence);
    // this.notLowerThanZero(lucky);

    this.notADouble(itemQuantity, agile, attack, defence, lucky);
    // this.notADouble(agile);
    // this.notADouble(attack);
    // this.notADouble(defence);
    // this.notADouble(lucky);

    await this.storesRef.add({
      ...createStoreDto,
      defaultQuantity: createStoreDto.itemQuantity,
    });
    return {
      message: 'create success',
      data: createStoreDto,
    };
  }

  async getStoreById(id: string) {
    const store = this.storesRef.doc(id);
    const exists = await store.get();
    if (!exists.createTime)
      throw new HttpException('Store id is not found', HttpStatus.BAD_REQUEST);
    return exists.data();
  }

  async updateStoreById(id: string, updateStoreDto: UpdateStoreDto) {
    const { itemQuantity, agile, attack, defence, lucky, itemDefaultQuantity } =
      updateStoreDto;
    this.notLowerThanZero(
      itemQuantity,
      agile,
      attack,
      defence,
      lucky,
      itemDefaultQuantity,
    );
    // this.notLowerThanZero(agile);
    // this.notLowerThanZero(attack);
    // this.notLowerThanZero(defence);
    // this.notLowerThanZero(lucky);
    // this.notLowerThanZero(itemDefaultQuantity);

    this.notADouble(
      itemQuantity,
      agile,
      attack,
      defence,
      lucky,
      itemDefaultQuantity,
    );
    // this.notADouble(agile);
    // this.notADouble(attack);
    // this.notADouble(defence);
    // this.notADouble(lucky);
    // this.notADouble(itemDefaultQuantity);

    const store = this.storesRef.doc(id);
    const exists = await store.get();
    if (!exists.createTime)
      throw new HttpException('Store id is not found', HttpStatus.BAD_REQUEST);

    await store.update({ ...updateStoreDto });
    return { message: 'store update success', data: updateStoreDto };
  }

  async deleteStoreByID(id: string) {
    const store = this.storesRef.doc(id);
    const exists = await store.get();
    if (!exists.createTime)
      throw new HttpException('Store id is not found', HttpStatus.BAD_REQUEST);

    // Find card exists this store
    const findCard = this.cardsRef.where('items', 'array-contains-any', [
      exists.id,
    ]);

    // Get item id array of that cards and also its id
    const card = (await findCard.get()).docs.map((data) => {
      const itemsInCards = data.data().items;
      const itemIdInCards = data.id;

      return { itemIdInCards, itemsInCards };
    });

    for (let i = 0; i < card.length; i++) {
      // Get item array
      let items = card[i].itemsInCards;
      // Get item id
      const itemId = card[i].itemIdInCards;
      // This will get items that not include deleting item id
      items = items.filter((data) => data !== id);

      await this.cardsRef.doc(itemId).update({ items: items });
    }

    await store.delete();
    return {
      message: 'delete success',
      id,
    };
  }
  // Function
  notADouble(...datas) {
    for (const data of datas) {
      if (data % 1 != 0)
        throw new HttpException(
          `Data: ${data} is a double type not a integer`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  notLowerThanZero(...datas) {
    // notLowerThanZero(number: number) {
    for (const data of datas) {
      if (data < 0)
        // if (number < 0)
        throw new HttpException(
          `Data ${data} is lower than 0 !!!`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
