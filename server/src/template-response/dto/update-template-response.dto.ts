import { PartialType } from '@nestjs/mapped-types';
import { CreateTemplateResponseDto } from './create-template-response.dto';

export class UpdateTemplateResponseDto extends PartialType(CreateTemplateResponseDto) {}
