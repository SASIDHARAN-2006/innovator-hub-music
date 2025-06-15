import React, { useContext } from "react";
import { AlbumContextAPI } from "../../context/AlbumContext";
import Spinner from "../../helpers/Spinner";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  let { albums, isLoading } = useContext(AlbumContextAPI);
  console.log(albums);

  return (
    <div className="p-8 w-[80%] ">
      <h2 className="text-3xl font-semibold ">Albums</h2>
      <section className="mt-4 flex gap-10 overflow-x-auto scrollbar-hide">
        {albums.map((album) => {
          return (
            <NavLink
              to="/album-details"
              state={{ album }}
              key={album.albumId}
              className="p-4 bg-slate-600 rounded-lg shrink-0"
            >
              <img
                src={album.albumPoster}
                alt=""
                className="h-[250px] w-[250px] rounded-lg"
              />
              <h3 className="mt-2 text-center text-xl font-semibold">
                {album.albumTitle}
              </h3>
            </NavLink>
          );
        })}
      </section>
      {isLoading && <Spinner />}
    </div>
  );
};

export default Dashboard;
