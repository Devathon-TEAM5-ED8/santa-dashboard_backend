import { Request, Response } from "express";
import { Climate } from "../database/entities/Climate";
import { Reindeer } from "../database/entities/Reindeer";
import { HfInference } from "@huggingface/inference";

export class ClimateController {
  async consultStateClima(req: Request, res: Response) {
    const baseUrl = process.env.BASE_URL_OPENWEATHER;
    const { lat, lon } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    try {
      // Llamada a la API de OpenWeatherMap
      const url = `${baseUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const resOpenweathermap = await fetch(url);
      const data = await resOpenweathermap.json();

      const dataClimate = {
        temperature: data.main.temp,
        minTemperature: data.main.temp_min,
        windSpeed: data.wind.speed,
        visibility: data.visibility,
        humidity: data.main.humidity,
        weatherState: data.weather[0].description,
      };

      const reindeers = await Reindeer.find({
        select: ["id", "name", "quality"],
        order: { currentPosition: "ASC" },
      });

      let renos = "";
      for (let i = 0; i < reindeers.length; i++) {
        renos += `ID:${reindeers[i].id} Nombre: ${reindeers[i].name} y su fortalezas es: ${reindeers[i].quality}\n`;
      }

      // Configuración de Hugging Face
      const hf = new HfInference(process.env.HUGGINGFACE_API);

      let outIa = "";
      const model = [
        "mistralai/Mistral-7B-Instruct-v0.2",
        "meta-llama/Llama-3.2-3B-Instruct",
        "meta-llama/Meta-Llama-3-8B-Instruct",
      ];

      const prompt = `Hola, soy Santa Claus y necesito de tu ayuda para salvar la Navidad. Mi misión es encontrar la mejor alineación de mis renos para que puedan volar con eficiencia, y tú puedes ayudarme con eso. Aquí tienes los datos del clima: ${JSON.stringify(
        dataClimate
      )}. A continuación, te doy las características de mis renos: ${JSON.stringify(
        renos
      )}.Responde exclusivamente en el siguiente formato JSON:
                  {
                    climateData: ${JSON.stringify(dataClimate)},
                    "suggestedAlignment": [
                      {
                        "idReindeer": "number",
                        "nameReindeer": "string",
                        "position": "number",
                      },
                      {
                        "idReindeer": "number",
                        "nameReindeer": "string",
                        "position": "number",
                      },
                    ],
                    "descriptionAlignment": "Explicación breve de por qué se sugiere esta alineación, tomando en cuenta los datos del clima y las características de los renos."
                  }

                  **Importante**:
                  - Basado del clima, si hay niebla, hacer sugerencia del orden de los renos.
                  - No generes ningún texto fuera del formato JSON.
                  - Mantén los mismos IDs de renos que te he dado, ya que cambiarlos causará problemas graves en la alineación.
                  - Proporciona una explicación precisa en el campo "descriptionAlignment", basada en los datos del clima y las características de los renos y no mas de 350 caracteres, siempre debe ser en español.
                  - La alineación debe tener exactamente 9 renos, ni más ni menos.
                  - El formato de respuesta siempre debe ser un arreglo de objetos JSON para evitar errores al procesar la data.
                  - Nunca generes una respuesta diferente a un JSON, si lo haces esto generara un error en el texto esperado ya que se suministrara por medio de una API.
                  - por favor traduce a español el weatherState de la respuesta del clima.
                  **Nota**: Solo debes responder en formato JSON, sin ningún texto adicional fuera del formato.`;

      for await (const chunk of hf.chatCompletionStream({
        model: model[2],
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.1,
      })) {
        if (chunk.choices && chunk.choices.length > 0) {
          outIa += chunk.choices[0].delta.content;
        }
      }

      let parsedIaResponse;
      try {
        parsedIaResponse = JSON.parse(outIa);
      } catch (error) {
        if (error instanceof SyntaxError) {
          return res.status(500).json({
            message: "Error al parsear la respuesta de la IA",
            error: error.message,
          });
        }
      }

      const climate = Climate.create({
        temperature: data.main.temp,
        minTemperature: data.main.temp_min,
        windSpeed: data.wind.speed,
        visibility: data.visibility,
        humidity: data.main.humidity,
        weatherState: parsedIaResponse.climateData.weatherState || "",
        recommendations: parsedIaResponse?.descriptionAlignment || "",
      });
      await climate.save();

      return res.status(200).json(parsedIaResponse);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Error en la consulta del clima",
          error: error.message,
        });
      }
    }
  }
}
