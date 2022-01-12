import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/config/db.config';
import { paginatedResult } from '../helper/pagination/paginatedResult';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  cardsRef = db.collection('cards');
  storesRef = db.collection('stores');

  async getAllCard(page = 1, limit = 3): Promise<any> {
    //Get all cards
    const cardsDetail = await this.cardsRef.get();
    if (!cardsDetail)
      throw new HttpException('Cannot get card', HttpStatus.BAD_REQUEST);

    const cardsDocs = cardsDetail.docs;

    //Get all items
    const itemsData = (await this.storesRef.get()).docs.map((data: any) => {
      return {
        id: data.id,
        attack: data.data().attack,
        defence: data.data().defence,
        agile: data.data().agile,
        lucky: data.data().lucky,
      };
    });

    // return itemsdata;
    const cardsData = cardsDocs.map((data) => {
      return { id: data.id, ...data.data() };
    });
    let attack = 0,
      defence = 0,
      agile = 0,
      lucky = 0;

    // This array contain cards have item in it
    const cards = cardsData.map((data: any) => {
      attack = data.attack;
      defence = data.defence;
      agile = data.agile;
      lucky = data.lucky;

      if (data.items.length > 0) {
        const items = data.items;
        items.forEach((i) => {
          // This comapare item in card with Stores item
          itemsData.forEach((j) => {
            if (j.id == i) {
              attack += j.attack;
              defence += j.defence;
              agile += j.agile;
              lucky += j.lucky;
            }
          });
        });
      }

      const final = {
        id: data.id,
        name: data.name,
        realName: data.realName,
        sex: data.sex,
        joinedIn: data.joinedIn,
        image: data.image,
        items: data.items,
        attack: attack,
        defence: defence,
        agile: agile,
        lucky: lucky,
      };

      return final;
      // return final;
    });

    return paginatedResult(cards, page, limit);
    // return cards;
  }

  async createCards(createCardDto: CreateCardDto) {
    if (createCardDto.items)
      throw new HttpException(
        'Items can`t be create must be in update',
        HttpStatus.BAD_REQUEST,
      );
    if ((await this.cardsRef.get()).docs.length > 6)
      // return { message: 'Card maximum number is 7' };
      throw new HttpException(
        'Card maximum number is 7',
        HttpStatus.BAD_REQUEST,
      );
    const create = await this.cardsRef.add({ ...createCardDto, items: [] });
    if (!create)
      throw new HttpException('Card hasn`t create', HttpStatus.BAD_REQUEST);
    return {
      message: 'card create success',
      data: { ...createCardDto, items: [] },
    };
  }

  async getCardById(id: string) {
    const card = await this.cardsRef.doc(id).get();
    if (!card.createTime)
      throw new HttpException('Card id is not found', HttpStatus.BAD_REQUEST);

    if (card.data().items.length == 0) return card.data();
    else {
      let attack = card.data().attack,
        defence = card.data().defence,
        agile = card.data().agile,
        lucky = card.data().lucky;

      // card.data().items.array.forEach((data) => {
      //   attack += data.data().attack;
      //   defence += data.data().defence;
      //   agile += data.data().agile;
      //   lucky += data.data().lucky;
      // });

      // await card.data().items.forEach(async (data) => {
      //   const findItem: any = await this.findItem(data);
      //   const item = await findItem.get();
      //   attack += item.data().attack;
      //   defence += item.data().defence;
      //   agile += item.data().agile;
      //   lucky += item.data().lucky;
      // });

      for (let i = 0; i < card.data().items.length; i++) {
        const findItem: any = await this.findItem(card.data().items[i]);
        const item = await findItem.get();
        attack += item.data().attack;
        defence += item.data().defence;
        agile += item.data().agile;
        lucky += item.data().lucky;
      }
      // console.log('attack: ', attack);
      return {
        name: card.data().name,
        realName: card.data().realName,
        joinedIn: card.data().joinedIn,
        sex: card.data().sex,
        items: card.data().items,
        image: card.data().image,
        attack,
        defence,
        agile,
        lucky,
      };
    }
  }

  async updateCard(id: string, updateCardDto: UpdateCardDto) {
    const { agile, attack, lucky, defence, ...rest } = updateCardDto;
    const card = this.cardsRef.doc(id);
    const exists = await card.get();

    if (!exists.createTime)
      throw new HttpException('Card id is not found', HttpStatus.BAD_REQUEST);

    const { items } = rest;

    // rest['items'] =

    // const notAllow = [lucky, agile, attack, defence];
    // for (const data of notAllow) {
    //   if (data != undefined)
    //     throw new HttpException(
    //       `This property: ${data} cannot be update`,
    //       HttpStatus.BAD_REQUEST,
    //     );
    // }
    // if (lucky != undefined)
    //   throw new HttpException(
    //     'This property cannot be update',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // if (agile != undefined)
    //   throw new HttpException(
    //     'This property cannot be update',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // if (attack != undefined)
    //   throw new HttpException(
    //     'This property cannot be update',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // if (defence != undefined)
    //   throw new HttpException(
    //     'This property cannot be update',
    //     HttpStatus.BAD_REQUEST,
    //   );

    // if (items) {

    // if (items?.length > 0) {
    //   // for (let i = 0; i < items.length; i++) {
    //   //   const findItem = await this.findItem(items[i]);
    //   //   const item = await findItem.get();
    //   //   const updateItemQuantity = item.data().itemQuantity - 1;
    //   //   findItem.update({ itemQuantity: updateItemQuantity });
    //   //   // }
    //   // }

    //   const a = items.map(async (data) => {
    //     const findItem = await this.findItem(data);
    //     const item = await findItem.get();
    //     const updateItemQuantity = item.data().itemQuantity - 1;
    //     this.notLowerThanZero(updateItemQuantity);
    //     findItem.update({ itemQuantity: updateItemQuantity });
    //   });
    //   await Promise.all(a);
    // }

    // If dont have item then:
    card.update({ ...updateCardDto });
    return { message: 'Update complete', data: { ...updateCardDto } };
  }

  // Missing adding 1 in quantity and update card property
  async deleteCard(id: string) {
    const card = this.cardsRef.doc(id);
    const exists = await card.get();
    if (!exists.createTime)
      throw new HttpException('Card id is not found', HttpStatus.BAD_REQUEST);

    if ((await this.cardsRef.get()).docs.length < 4)
      return { message: 'Number of cards now is 3 cannot delete more' };

    card.delete();
    return {
      message: 'delete success',
      id,
    };
  }

  async deleteItem(id: string) {
    const card = this.cardsRef.doc(id);
    const exists = await card.get();
    if (!exists.createTime)
      throw new HttpException('Card id is not found', HttpStatus.BAD_REQUEST);

    card.update({ items: [] });
    return { message: 'Clear item complete' };
  }

  // Function
  // Find item and check if it exists
  async findItem(item: string) {
    const itemExists = this.storesRef.doc(item);
    if (!(await itemExists.get()).createTime) {
      throw new HttpException('Item not exists', HttpStatus.BAD_REQUEST);
    }
    return itemExists;
  }

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
    for (const data of datas) {
      if (data < 0)
        throw new HttpException(
          `Data ${data} is lower than 0 !!!`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }
  // notLowerThanZero(number: number) {
  //   if (number < 0)
  //     throw new HttpException(
  //       `Data is lower than 0 !!!`,
  //       HttpStatus.BAD_REQUEST,
  //     );
  // }
}
