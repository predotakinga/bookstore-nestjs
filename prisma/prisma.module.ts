import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { BooksService } from 'src/books/books.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [BooksService, PrismaService, AuthService, JwtService],
  exports: [PrismaService],
})
export class PrismaModule {}
