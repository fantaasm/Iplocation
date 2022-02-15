import type {NextApiRequest, NextApiResponse} from 'next'

const baseUrl :string = "http://ip-api.com/json/";

export type IpResponse = {
  city: string,
  country: string,
  countryCode: string,
  isp:string,
  lat: number,
  lon: number,
  query: string,
  regionName: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<IpResponse>) {
  const result  = await fetch(baseUrl + req.query.ip).then(res => res.json());
  res.status(200).json(result)
}