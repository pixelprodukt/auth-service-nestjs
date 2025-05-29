import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('.well-known')
export class WellKnownController {

    @Get('jwks.json')
    public getJwks(@Res() res: Response) {
        const jwks = fs.readFileSync(path.join(__dirname, '..', '..', '.well-known/jwks.json'));
        res.setHeader('Content-Type', 'application/json');
        res.send(jwks);
    }

}