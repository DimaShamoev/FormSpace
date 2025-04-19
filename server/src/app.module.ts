import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TemplateModule } from './template/template.module';
import { TemplateLikesModule } from './template_likes/template_likes.module';
import { TagModule } from './tag/tag.module';
import { TemplateResponseModule } from './template-response/template-response.module';
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [DatabaseModule, UserModule, AuthModule, TemplateModule, TemplateLikesModule, TagModule, TemplateResponseModule, CommentModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}