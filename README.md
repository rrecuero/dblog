
dBlog is a blogging platform. Users can create a censorship-resistant blog that lives on IPFS through our platform. They don't need to use Metamask or buy ETH to use it. Every post is an NFT that lives on the Kovan network.

## Why

We are seeing a lack of adoption of dAPPs. We believe the great friction and poor UX is one of the main reasons along with a lack of focus on real problems. Users don't care about decentralization. Users want 10x better, 10x cheaper or do something that they could not do before.

One of the most obvious places where a decentralized application makes sense is for a blogging platform. Freedom of speech is a universal right. However, many outlets (Wikileaks) are forced to go underground because there is no censorship-resistant alternative. At the same time, many users experience vendor-lock in. They write the posts in a platform (WordPress, medium) and eventually they find themselves trapped.

Fred Wilson has written about this problem many times: " We are one step closer to the decentralized blogging platform that I have long wanted.

https://avc.com/2018/09/cloudflares-ipfs-gateway/

Recently, CloudFlare has released an IPFS gateway that has made this much easier:

https://blog.cloudflare.com/distributed-web-gateway/

## Technologies used

Built using my starter kit [fstack-ethdapp-template](https://github.com/rrecuero/)

- React/Redux + Drizzle
- Web3: Truffle, Ganache, OpenZeppelin, Infura, IPFS
- Backend: Node JS, Express

## Cloud services used

- Stripe
- Auth0
- Heroku

## Live

[See it live on Heroku](https://dapis-dblog.herokuapp.com/)
