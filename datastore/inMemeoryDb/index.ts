import { Datastore } from "..";
import { LoginUserRes } from "../../api";
import { User, Post, Comment, Like } from "../../types";
import { PrismaClient } from "@prisma/client";
export class InMemoryDb implements Datastore {
  private prisma = new PrismaClient();

  posts: Post[] = [
    {
      id: "postA",
      title: "first post",
      url: "www.google.com",
      userId: "user1",
      postedAt: Date.now(),
    },
  ];
  private likes: Like[] = [];
  private comments: Comment[] = [];

  async register(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        password: user.password,
      },
    });
    return Promise.resolve();
  }
  async checkUserEmailIsExist(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
  async checkUserUsernameIsExist(username: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }
  async getUser(userId: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return;
    }
    return user;
  }
  postList(): Promise<Post[]> {
    return Promise.resolve(this.prisma.post.findMany());
  }
  async createPost(post: Post): Promise<void> {
    // this.posts.push(post);
    await this.prisma.post.create({
      data: {
        title: post.title,
        userId: post?.userId,
        url: post.url,
        postedAt: new Date(Date.now()),
      },
    });
    return Promise.resolve();
  }
  async getPost(postId: string): Promise<Post | null> {
    return await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
  }
  async updatePost(
    postId: string,
    data: Pick<Post, "title" | "url">
  ): Promise<void> {
    const updatedposetd: Post = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: data.title,
        url: data.url,
      },
    });

    // this.posts = this.posts.filter((p) => {
    //   if (p.id === postId) {
    //     console.log("updated poste" + JSON.stringify(p));
    //     return { ...p, ...data };
    //   }
    //   return p;
    // });
    return Promise.resolve();
  }
  deletePost(postId: string): Promise<Post | undefined> {
    // const index: number = this.posts.findIndex((p) => p.id === postId);
    // if (index === -1) {
    //   return Promise.resolve();
    // }
    // this.posts.splice(index, 1);
    return Promise.resolve(
      this.prisma.post.delete({
        where: {
          id: postId,
        },
      })
    );
  }
  createComment(comment: Comment): Promise<void> {
    this.comments.push(comment);
    return Promise.resolve();
  }
  commentList(postId: string): Promise<Comment[]> {
    return Promise.resolve(this.comments.filter((c) => c.postId === postId));
  }
  updateComment(commentId: string, data: Comment): Promise<void> {
    this.comments = this.comments.filter((c) => {
      if (c.id === commentId) {
        return { c, ...data };
      }
      return c;
    });
    return Promise.resolve();
  }
  deleteComment(commentId: string): Promise<void> {
    const index = this.comments.findIndex((c) => c.id === commentId);
    if (index === -1) {
      return Promise.resolve();
    }
    this.comments.splice(index, 1);
    return Promise.resolve();
  }
  createLike(like: Like): Promise<void> {
    this.likes.push(like);
    return Promise.resolve();
  }
  deleLike(likeId: string): Promise<void> {
    const index = this.likes.findIndex((l) => l.id === likeId);
    if (index === -1) {
      return Promise.resolve();
    }
    this.likes.splice(index, 1);
    return Promise.resolve();
  }
}
