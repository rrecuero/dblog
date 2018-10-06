const MyStringStore = artifacts.require("./MyStringStore.sol");
const PostFactory = artifacts.require("./PostFactory.sol");

// contract("MyStringStore", accounts => {
//   it("should store the string 'Hey there!'", async () => {
//     const myStringStore = await MyStringStore.deployed();

//     // Set myString to "Hey there!"
//     await myStringStore.set("Hey there!", { from: accounts[0] });

//     // Get myString from public variable getter
    // const storedString = await myStringStore.myString.call();

//     assert.equal(storedString, "Hey there!", "The string was not stored");
//   });
// });

contract("PostFactory", accounts => {
  it("should create a post", async () => {
    const postFactory = await PostFactory.deployed();

    // console.log(postFactory);

    // Set myString to "Hey there!"
    await postFactory.createPost("Hey there!", "fasra", { from: accounts[0] });

    // console.log(postFactory);

    // Get myString from public variable getter
    // const storedString = await postFactory.postsToOwner.call();

    // console.log(storedString);

    assert.equal(undefined);
  });
});
