import { RedisSaver } from "@langchain/langgraph-checkpoint-redis";
import redis from "#configs/redis.js";

const checkpointer = new RedisSaver({
  client: redis,
});

export default checkpointer;
