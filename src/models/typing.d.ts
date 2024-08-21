declare namespace API{
     type CurrentUser = {
        id: number;

        username: string;

        userAccount: string;

        avatarUrl?: string;

        gender: number;

        phone: string;

        email: string;

        userStatus: number;

        createTime: Date;

        userRole: number;

        tags: string[];

        profile: string;

        planetCode: string;
    };

   type Team = {
      id: number;
      name: string;
      description: string;
      expireTime?: Date;
      maxNum: number;
      password?: string;
      //todo 定义枚举值，更规范
      status?: number;
      createTime: Date;
      updateTime: Date;
      userId: number;
      createUser?: CurrentUser;
   }
}
