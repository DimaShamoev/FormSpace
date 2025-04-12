import { PartialType } from '@nestjs/mapped-types';
import { CreateTemplateLikeDto } from './create-template_like.dto';

export class UpdateTemplateLikeDto extends PartialType(CreateTemplateLikeDto) {}
