import {Entity, model, property} from '@loopback/repository';

@model()
export class Post extends Entity {
  
    @property({
      type: 'string',
      id: true,
      generated: true,
    })
    id?: string;

    @property({
      type: 'string',
      required: true,
    })
    status: 'pending' | 'aproved' | 'refused';

    @property({
    type: 'string',
    required: true,
  })
  category: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  subcategory?: {type: string, value: string}[];

  @property({
    type: 'object',
    required: true,
  })
  ubication: {lat: string, lon: string};

  @property({
    type: 'array',
    itemType: 'string',
  })
  keyword?: string[];

  @property({
    type: 'object',
    required: true,
  })
  content: {title: string, description: string, files: {type: string, value: any, name: string}[]};

  constructor(data?: Partial<Post>) {
    super(data);
  }
}

export interface PostRelations {
  // describe navigational properties here
}

export type PostWithRelations = Post & PostRelations;
