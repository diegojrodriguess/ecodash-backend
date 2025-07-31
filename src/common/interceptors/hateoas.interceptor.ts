import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HateoasInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const originalUrl = req.originalUrl;

    return next.handle().pipe(
      map((data) => {
        if (!data || typeof data !== 'object') return data;

        const id = data?.id;
        const baseUrl = originalUrl.split('/').slice(0, 2).join('/'); 

        const links: any = {
          self: { href: id ? `${baseUrl}/${id}` : `${baseUrl}` },
          all: { href: `${baseUrl}` },
        };

        if (id) {
          links.update = { href: `${baseUrl}/${id}` };
          links.delete = { href: `${baseUrl}/${id}` };
        }

        return { ...data, _links: links };
      }),
    );
  }
}
