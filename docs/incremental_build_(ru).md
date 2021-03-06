# Инкрементальная сборка

## Варианты переноса asset'ов

* Один к одному
* Один ко многим
* Много ко многим

### Один к одному

Например, копирование asset'ов.

### Один ко многим

Всегда запускаем пересборку.

### Много ко многим

* Возникает при сборке модулей, когда требуется _dependency graph_.
* Нужна мемоизация как в плагине `gulp-remember`.
* Лучше доверять специальным инструментам: CSS-препроцессорам, JS-бандлерам.

## Встроенные методы и опции Gulp

### `gulp.src()`, опция `since`

* Сравнение файлов всегда происходит по дате модификации. Чтобы сравнивать по контенту, стоит использовать плагины `gulp-cached` или `gulp-cache`.
* При работе в VS Code в Windows существует проблема учёта файлов, которые были добавлены вручную после начала отслеживаемой сборки, но не через IDE, а напрямую через Windows Explorer. Проблема решается отключением данной опции и подключением плагина `gulp-cached`.
* Ввиду модульной архитектуры современных проектов, отдельные файлы сами по себе сравнительно небольшие, поэтому сравнение по контенту не должно быть большой проблемой.

### `gulp.watch()`

Обработчики, переданные напрямую в экземпляр `chokidar` через метод `.on()`, срабатывают _до_ выполнения задач, переданых в качестве аргумента в `gulp.watch()`.

## Gulp-плагины

### `gulp-changed`

* Хорошо работает, если нужно соотносить файлы по принципу «один к одному».
* Имеет смысл применять для редких операций ‒ например, при минификации изображений, и то в случае, если все изображения хранятся в одном месте.
* Подходит, если не происходит очистка выходной директории перед повторным ручным запуском сборки.

### `gulp-cached`

* В ситуации сравнения файлов по контенту эффективнее, чем `gulp-changed`, т.к. позволяет сравнить контент исходного файла с его же более ранней версией, а не производить трансформации и сравнивать преобразованные файлы с их более ранними версиями в целевой директории.
* __Внимание!__ Если целевая директория будет вручную удалена во время сборки, она не будет восстановлена в процессе инкрементальной сборки.

### `gulp-remember`

* Порядок вставки контента файлов может меняться между сборками. Например, если в процессе одной сборки в проект были добавлены новые файлы, то они окажутся последними в списке на добавление, а при следующей сборке файлы расположатся в лексикографическом порядке следования их имён/путей. Это будет проблемой, если порядок подключения важен (например, если это CSS).
* Плагин может быть актуален для процессов сборки «много к одному» с `since` и без необходимости следить за порядок подключения. Подобный случай маловероятен в настоящее время, т.к. для используется импортирование модулей и кэширование на уровне препроцессоров и бандлров.
