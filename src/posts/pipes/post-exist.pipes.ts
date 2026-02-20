import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from '../posts.service';

@Injectable()
export class PostExistsPipe implements PipeTransform {
  constructor(private readonly postsService: PostsService) {}
  transform(value: number, metadata: ArgumentMetadata) {
    try {
      console.log(metadata);
      this.postsService.getOnePost(value);
    } catch (error) {
      throw new NotFoundException(`Post with ID ${value} not found ${error} `);
    }
    return value;
  }
}
