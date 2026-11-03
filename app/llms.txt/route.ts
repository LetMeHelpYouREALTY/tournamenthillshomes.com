const body = `# Tournament Hills Homes | Dr. Jan Duffy

> A buyer resource for guard-gated custom homes in Tournament Hills, Summerlin, Las Vegas, NV 89134, by Dr. Jan Duffy, REALTOR®, Berkshire Hathaway HomeServices Nevada Properties.

## Pages
- [Home](https://www.tournamenthillshomes.com/)
- [Tournament Hills neighborhood](https://www.tournamenthillshomes.com/neighborhoods/tournament-hills)
- [FAQ](https://www.tournamenthillshomes.com/faq)
- [Sell your home](https://www.tournamenthillshomes.com/sellers)
- [Contact](https://www.tournamenthillshomes.com/contact)
`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
