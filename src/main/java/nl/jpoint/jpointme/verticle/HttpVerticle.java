package nl.jpoint.jpointme.verticle;

import org.vertx.java.core.logging.Logger;
import org.vertx.java.platform.Verticle;

public class HttpVerticle extends Verticle {

    public static final int SERVER_PORT = 8090;

    public void start() {

        final Logger log = container.logger();

        log.info("Starting " + this.getClass().getName());

        vertx.createHttpServer().requestHandler(request -> {
            request.response().end("Hello World!");
        }).listen(SERVER_PORT);

    }
}
