import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface } from './interfaces/post.interface';
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  findAll(@Query('search') search: string): PostInterface[] {
    const extractAllposts = this.postsService.getAllPosts();
    if (search) {
      return extractAllposts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return extractAllposts;
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): PostInterface {
    return this.postsService.getOnePost(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(
    @Body() createdPost: Omit<PostInterface, 'id' | 'createdAt'>,
  ): PostInterface {
    return this.postsService.createPost(createdPost);
  }
  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedPost: Partial<Omit<PostInterface, 'id' | 'createdAt'>>,
  ): PostInterface {
    return this.postsService.updatePost(id, updatedPost);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(
    @Param('id', ParseIntPipe) id: number,
    //@Body() updatedPost: Partial<Omit<PostInterface, 'id' | 'createdAt'>>,
  ) {
    return this.postsService.deletePost(id);
  }
}
