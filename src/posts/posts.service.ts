import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the content of the first post.',
      authorName: 'John Doe',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'This is the content of the second post.',
      authorName: 'Jane Smith',
      createdAt: new Date(),
    },
  ];
  getAllPosts(): Post[] {
    return this.posts;
  }
  getOnePost(id: number): Post {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }
  createPost(post: Omit<Post, 'id' | 'createdAt'>): Post {
    const newPost: Post = {
      id:
        this.posts.length > 0
          ? Math.max(...this.posts.map((a) => a.id)) + 1
          : 1,
      createdAt: new Date(),
      ...post,
    };
    this.posts.push(newPost);
    return newPost;
  }
  updatePost(id: number, post: Partial<Omit<Post, 'id' | 'createdAt'>>): Post {
    const existingPostIndex = this.posts.findIndex((p) => p.id === id);
    if (existingPostIndex === -1) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    const updatedPost: Post = {
      ...this.posts[existingPostIndex],
      ...post,
      updatedAt: new Date(),
    };
    this.posts[existingPostIndex] = updatedPost;
    return updatedPost;
  }
  deletePost(id: number): void {
    const existingPostIndex = this.posts.findIndex((p) => p.id === id);
    if (existingPostIndex === -1) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    this.posts.splice(existingPostIndex, 1);
  }
}
