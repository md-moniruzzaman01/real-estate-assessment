import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { CreateProjectDto, UpdateProjectDto } from 'src/common/dto/projects.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProjectDto): Promise<Project> {
    return this.prisma.project.create({ data });
  }

  findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  findOne(id: number): Promise<Project | null> {
    return this.prisma.project.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateProjectDto): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<Project> {
    return this.prisma.project.delete({ where: { id } });
  }
}
