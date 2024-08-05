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
}
