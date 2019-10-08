import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public readonly Links = {
    login: 'api/auth',
    logout: 'api/auth/logout',
    user: 'api/user',
    blog: 'api/blog',
    message: 'api/message',
    village: 'api/village'
  }

  villages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { 
    
  }

  login(username: string, password: string) {
    return this.http.post(this.Links.login, { username, password, source: 'portal' })
  }

  logout(userId: string) {
    return this.http.post(this.Links.logout, userId);
  }

  getUsers() {
    return this.http.get(this.Links.user);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.Links.user, { user });
  }

  getUserFromId(userId: string) {
    return this.http.get(`${this.Links.user}/${userId}`);
  }

  updateUser(userId: string, user) {
    return this.http.patch(this.Links.user, { userId, user })
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.Links.user}/${userId}`);
  }

  getBlogs() {
    return this.http.get(this.Links.blog);
  }

  addBlog(blog) {
    return this.http.post(this.Links.blog, blog);
  }

  updateBlog(blogId, blog) {
    return this.http.patch(this.Links.blog, { blogId, blog });
  }

  getBlogbyId(blogId) {
    return this.http.get(`${this.Links.blog}/${blogId}`);
  }

  deleteBlogById(blogId) {
    return this.http.delete(`${this.Links.blog}/${blogId}`);
  }

  getVillages() {
    return this.http.get(this.Links.village);
  }

  addVillage(village) {
    return this.http.post(this.Links.village, { village });
  }

  updateVillage(id, village) {
    return this.http.patch(this.Links.village, { id, village });
  }

}
