import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { ProfesionalesModule } from './profesionales/profesionales.module';
import { TutoresModule } from './tutores/tutores.module';
import { SalasModule } from './salas/salas.module';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, //solo para desarrollo, no usar en producción!!
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    PacientesModule,
    ProfesionalesModule,
    TutoresModule,
    SalasModule,
    ReportesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
