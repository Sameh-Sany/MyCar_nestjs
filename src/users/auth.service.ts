import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);

    if (users.length) {
      throw new BadRequestException('email in use');
    }

    const salt = await bcrypt.genSalt(); // generate salt

    const hash = await bcrypt.hash(password, salt); // generate hash

    const user = await this.userService.create(email, hash);

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    const checkUserPassword = await bcrypt.compare(password, user.password);

    if (!checkUserPassword) {
      throw new BadRequestException('invalid credentials');
    }
    return user;
  }
}
