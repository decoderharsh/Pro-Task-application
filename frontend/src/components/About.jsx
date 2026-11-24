import React from 'react'
import { FolderKanban, ListTodo, Users, ChartNoAxesCombined, Target,Goal} from "lucide-react";

const About = () => {
 

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
       {/* Hero Section */}
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
        About <span className="text-red-600">ProTask</span>
      </h1>

      <p className="text-gray-700 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
        A smarter way to manage projects, organize tasks and collaborate with your team.
      </p>
    </div>

   

{/* Purpose & Goal */}
<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Our Purpose */}
  <div className="bg-linear-to-br from-emerald-50 to-white border border-emerald-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">

    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-5">
      <Target size={26} className="text-emerald-600" />
    </div>

    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      Our Purpose
    </h2>

    <p className="text-gray-600 leading-7">
      Managing multiple projects and tasks can be challenging.
      ProTask brings everything together in one place, helping
      you stay organized, manage your workload and keep track
      of your progress.
    </p>
  </div>

  {/* Our Goal */}
  <div className="bg-linear-to-br from-orange-50 to-white border border-orange-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">

    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5">
      <Goal size={26} className="text-orange-600" />
    </div>

    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      Our Goal
    </h2>

    <p className="text-gray-600 leading-7">
      To make project management simpler, improve productivity
      and help teams work more efficiently through better
      organization and collaboration.
    </p>
  </div>

</div>


{/* Key Features */}
<div className="mt-8">

  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-gray-800">
      What You Can Do With ProTask
    </h2>
    <p className="text-gray-500 mt-2">
      Everything you need to keep your work organized.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
      <FolderKanban className="text-blue-500 mb-4" size={30} />
      <h3 className="font-bold text-lg text-gray-800 mb-2">
        Project Management
      </h3>
      <p className="text-sm text-gray-500 leading-6">
        Create and manage your projects in one place.
      </p>
    </div>

    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
      <ListTodo className="text-green-600 mb-4" size={30} />
      <h3 className="font-bold text-lg text-gray-800 mb-2">
        Task Management
      </h3>
      <p className="text-sm text-gray-500 leading-6">
        Create, assign and organize your tasks easily.
      </p>
    </div>

    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
      <Users className="text-purple-600 mb-4" size={30} />
      <h3 className="font-bold text-lg text-gray-800 mb-2">
        Team Collaboration
      </h3>
      <p className="text-sm text-gray-500 leading-6">
        Manage team members and work together.
      </p>
    </div>

    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
      <ChartNoAxesCombined className="text-orange-600 mb-4" size={30} />
      <h3 className="font-bold text-lg text-gray-800 mb-2">
        Progress Tracking
      </h3>
      <p className="text-sm text-gray-500 leading-6">
        Monitor task status and track progress.
      </p>
    </div>

  </div>
</div>

    </div>
    
  )
}

export default About