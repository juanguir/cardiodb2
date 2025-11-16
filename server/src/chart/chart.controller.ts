import { Controller, Get } from '@nestjs/common';

@Controller('api/chart-data')
export class ChartController {
  @Get()
  getData(){
    // retorna arrays de 12 meses
    const bar = [500,700,400,850,900,1200,950,1300,1100,1400,1200,1500];
    const line = [300,400,550,700,850,950,1100,1300,1250,1500,1400,1600];
    const pie = [45,25,20,10];
    return { bar, line, pie };
  }
}
