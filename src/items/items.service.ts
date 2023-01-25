import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from 'src/dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { Item } from '../entities/item.entity';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
    constructor(private readonly itemRepository: ItemRepository){}
    private items: Item[] = [];
    findAll(){
        return this.items;
    }
    findById(id: string): Item{
        const found = this.items.find(item => item.id === id);
        if(!found) {
            throw new NotFoundException();
        }
        return found; 
    }
    async create(CreateItemDto: CreateItemDto): Promise<Item> {
        return await this.itemRepository.createItem(CreateItemDto);
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
