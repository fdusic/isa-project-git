export class User{

  public name:string='';
  public surname:string='';
  public email:string='';
  public password:string='';
  public friends:User[]=[];
  public friendRequests:User[]=[];

  constructor(){
  }
}
