import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {INestApplication} from '@nestjs/common';
import {envConfiguration} from "../env.config";

export class SwaggerConfig {
	static ConfigSwaggerModule(app: INestApplication): void {
		const config = new DocumentBuilder()
			.setTitle("Prueba E-GROUP -- Desarrollador: Deiber Duban Olivares Olivares")
			.setDescription("API RESTFull dedicada a la gestion de una tienda de productos")
			.setVersion("v1.0.0")
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup(`api`, app, document, {
			swaggerOptions: {
				filter: true,
				showRequestDuration: true,
			},
		});
	};
}
