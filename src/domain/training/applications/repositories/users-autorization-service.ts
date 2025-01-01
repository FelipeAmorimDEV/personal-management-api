export abstract class UsersAutorizationService {
  abstract isAdmin(userId: string): Promise<boolean>
}
