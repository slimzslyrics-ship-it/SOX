
import { Package, Operator } from './types';

export const PACKAGES: Package[] = [
  // DIÁRIOS
  { id: 'd1', name: '1024MB Diário', operator: Operator.VODACOM, validity: '24h', price: 18 },
  { id: 'd2', name: '2048MB Diário', operator: Operator.VODACOM, validity: '24h', price: 36 },
  { id: 'd3', name: '3072MB Diário', operator: Operator.VODACOM, validity: '24h', price: 54 },
  { id: 'd4', name: '4096MB Diário', operator: Operator.VODACOM, validity: '24h', price: 72 },
  { id: 'd5', name: '5120MB Diário', operator: Operator.VODACOM, validity: '24h', price: 90 },
  { id: 'd6', name: '10240MB Diário', operator: Operator.VODACOM, validity: '24h', price: 175 },
  { id: 'd7', name: '20480MB Diário', operator: Operator.VODACOM, validity: '24h', price: 345 },
  
  // MENSAL
  { id: 'm1', name: '2.857MB Mensal', operator: Operator.VODACOM, validity: '30 dias', price: 90 },
  { id: 'm2', name: '4.000MB Mensal', operator: Operator.VODACOM, validity: '30 dias', price: 135 },
  { id: 'm3', name: '6.000MB Mensal', operator: Operator.VODACOM, validity: '30 dias', price: 175 },
  { id: 'm4', name: '7.000MB Mensal', operator: Operator.VODACOM, validity: '30 dias', price: 195 },
  { id: 'm5', name: '8.000MB Mensal', operator: Operator.VODACOM, validity: '30 dias', price: 215 },
  { id: 'm6', name: '9.000MB Mensal', operator: Operator.VODACOM, validity: '30 dias', price: 235 },
  { id: 'm7', name: '11.000MB Mensal', operator: Operator.VODACOM, validity: '30 dias', price: 255 },
  { id: 'm8', name: '13.000MB Mensal', operator: Operator.VODACOM, validity: '30 dias', price: 290 },
  { id: 'm9', name: '16.000MB Mensal', operator: Operator.VODACOM, validity: '30 dias', price: 350 },
  { id: 'm10', name: '20.000MB Mensal', operator: Operator.VODACOM, validity: '30 dias', price: 450 },

  // PROMOÇÃO DIAMANTE TUDO TOP
  { id: 'diam1', name: 'Diamante: 11GB + Ilimitado Chamadas/SMS Todas Redes', operator: Operator.VODACOM, validity: '30 dias', price: 500 },
  { id: 'diam2', name: 'Diamante: 15GB + Ilimitado Chamadas/SMS Todas Redes', operator: Operator.VODACOM, validity: '30 dias', price: 600 },
  { id: 'diam3', name: 'Diamante: 23GB + Ilimitado Chamadas/SMS Todas Redes', operator: Operator.VODACOM, validity: '30 dias', price: 800 },
  { id: 'diam4', name: 'Diamante: 37GB + Ilimitado Chamadas/SMS Todas Redes', operator: Operator.VODACOM, validity: '30 dias', price: 1050 },

  // SALDO
  { id: 's1', name: '100 Saldo', operator: Operator.VODACOM, validity: 'Saldo Simples', price: 85 },
  { id: 's2', name: '500 Saldo', operator: Operator.VODACOM, validity: 'Saldo Simples', price: 410 },
  { id: 's3', name: '1000 Saldo', operator: Operator.VODACOM, validity: 'Saldo Simples', price: 810 },
];

export const ADMIN_PHONE = '844093959';
export const ADMIN_NAME = 'BENIDITA';
export const RED_HEX = '#E10600';
