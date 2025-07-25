import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoansModule } from './loans/loans.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { LibrariesModule } from './libraries/libraries.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PSWD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
    }),
    LoansModule,
    UsersModule,
    BooksModule,
    LibrariesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // Initialisation de la base de données
  constructor(private dataSource: DataSource) {
    console.log('=============================');
    console.log('Database connected:', this.dataSource.isInitialized);
    console.log('=============================');
  }
}
