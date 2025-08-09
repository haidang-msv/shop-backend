import { IsEmail, IsNotEmpty, IsOptional, Length, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'Email address must not be empty' }) // Bắt buộc phải gửi lên
	@MaxLength(50, {message:'Email address max length is 50 characters'}) // Tối đa 50 ký tự
    @IsEmail({}, { message: 'Invalid email address' }) // Bắt buộc phải định dạng email
    Email: string;

    @IsNotEmpty({message:'User code must not be empty'})
    @MaxLength(50, {message:'Email address max length is 50 characters'})
    // @IsUnique // class-validator ko có decorator này, vì phải kiểm tra db mới biết có unique ko, nếu muốn phải viết Validator Custom
    UserCode: string;

    @IsNotEmpty({message:'Password must not be empty'})
    // @MaxLength(200)
    @Length(6, 200, { message: 'Password must be between 6 and 200 characters' })
    UserPass: string;

    @IsOptional() // Không bắt buộc phải gửi lên
    @MaxLength(50, {message:'Email address max length is 50 characters'})
    UserRole: string;

    @IsOptional() // Không bắt buộc phải gửi lên
    @MaxLength(200, {message:'Email address max length is 200 characters'})
    Address: string;

    @IsOptional() // Không bắt buộc phải gửi lên
    @MaxLength(200, {message:'Email address max length is 200 characters'})
    Photo: string;

    @IsOptional() // Không bắt buộc phải gửi lên
    @MaxLength(200, {message:'Email address max length is 200 characters'})
    AccountType: string;
}
