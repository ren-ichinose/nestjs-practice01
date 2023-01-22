import { Injectable } from '@nestjs/common';
import { ItemStatus } from './item-status.enum';
import { Item } from './items.model';

@Injectable()
export class ItemsService {
    private items: Item[] = [];
    findAll(){
        return this.items;
    }
    findById(id: string): Item{
        return this.items.find(item => item.id === id)
    }
    create(item: Item): Item{
        this.items.push(item);
        return item;
    }
    updateStatus(id: string): Item {
        const item = this.findById(id);
        item.status = ItemStatus.SOLD_OUT;
        return item;
    }
    deleat(id: string): void{
        this.items = this.items.filter(item => item.id !== id)
    }
}
