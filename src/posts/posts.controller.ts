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
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistsPipe } from './pipes/post-exist.pipes';
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
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  // @UsePipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //   }),
  // )
  createOne(@Body() createdPost: CreatePostDto): PostInterface {
    return this.postsService.createPost(createdPost);
  }
  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe, PostExistsPipe) id: number,
    //@Body() updatedPost: Partial<Omit<PostInterface, 'id' | 'createdAt'>>,
    @Body() updatedPost: UpdatePostDto,
  ): PostInterface {
    return this.postsService.updatePost(id, updatedPost);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(
    @Param('id', ParseIntPipe, PostExistsPipe) id: number,
    //@Body() updatedPost: Partial<Omit<PostInterface, 'id' | 'createdAt'>>,
  ) {
    return this.postsService.deletePost(id);
  }
}
