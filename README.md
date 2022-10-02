# CMG Engineering Audition

365-Widgets makes inexpensive home sensors such as thermometers, humidistats, and carbon monoxide detectors. In order to spot check the
manufacturing process, some units are put in a test environment (for an unspecified amount of time) and their readings are logged. The test
environment is controlled with a known temperature, humidity, and CO concentration, but the inexpensive sensors are expected to have some
variation with each reading.

As a developer, your task is to process the log files and automate the quality control evaluation. The evaluation criteria are as follows:

1. For a thermometer, it is branded “ultra precise” if the mean of the readings is within 0.5 degrees of the known temperature, and the standard
   deviation is less than 3. It is branded “very precise” if the mean is within 0.5 degrees of the room, and the standard deviation is under 5. Otherwise,
   it’s sold as “precise”.
2. For a humidity sensor, it must be discarded unless it is within 1 humidity percent of the reference value for all readings. (All humidity sensor
   readings are a decimal value representing percent moisture saturation.)
3. For a carbon monoxide detector, it must be discarded unless it is within 3 ppm of the reference value for all readings. (All carbon monoxide
   readings are an integer value representing parts per million.)
   An example log looks like the following. The first line means that the room was held at a constant 70 degrees, 45% relative humidity with 6 ppm
   carbon monoxide. Subsequent lines either identify a sensor (<type> <name>) or give a reading (<time> <value>)
