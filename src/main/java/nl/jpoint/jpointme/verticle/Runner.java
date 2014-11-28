package nl.jpoint.jpointme.verticle;

import org.vertx.java.core.json.JsonObject;
import org.vertx.java.platform.Verticle;

public class Runner extends Verticle {

    public void start() {
        container.deployVerticle(HttpVerticle.class.getName(), new JsonObject());
    }

}
