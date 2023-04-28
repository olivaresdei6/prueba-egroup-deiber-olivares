import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {INestApplication} from '@nestjs/common';
import {envConfiguration} from "../env.config";

export class SwaggerConfig {
	static ConfigSwaggerModule(app: INestApplication): void {
		const config = new DocumentBuilder()
			.setTitle("Prueba CUC - Deiber Olivares RESTFull API")
			.setDescription("API RESTFull para la gestion de cursos, grupos, docentes y estudiantes.")
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
