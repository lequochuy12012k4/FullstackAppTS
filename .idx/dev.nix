{ pkgs, ... }: {
  channel = "stable-25.05";
  packages = [
    pkgs.nodejs_latest
    pkgs.mongodb
  ];
  services.mongodb = {
    enable = true;
  };
  idx = {
    extensions = [
      "mongodb.mongodb-vscode"
    ];

    workspace = {
      onStart = {
        start-database = "mongod --port 27017 --fork --logpath ./.idx/database.log --dbpath ./.idx/.data";
        start-backend = "cd Backend && npm run dev";
        start-frontend = "cd Frontend && npm run dev";
      };
    };
    previews = {
      enable = true;
      previews = { };
    };
  };
}
